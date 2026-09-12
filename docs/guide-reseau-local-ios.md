# Utiliser l'app sur iPhone avec la base de données locale du MacBook

Objectif : faire tourner **MariaDB + l'API NestJS sur le MacBook Air M3**, et utiliser
l'application **sur un iPhone 14 Plus physique**, les deux appareils étant sur le
**même Wi-Fi domestique**.

```
iPhone 14 Plus  ──HTTP (Wi-Fi LAN)──▶  MacBook Air M3
                                        ├─ API NestJS  : port 3000
                                        └─ MariaDB      : port 3306 (accès local à l'API uniquement)
```

L'app ne parle jamais directement à MariaDB : elle appelle l'API, qui parle à la base.
« Base accessible depuis l'iPhone » = **API du Mac joignable depuis l'iPhone**.

---

## 0. Prérequis

Sur le MacBook :

- Node.js 22+ (`node -v`), npm 10+
- Xcode installé, avec les outils en ligne de commande (`xcode-select --install`)
- CocoaPods via Bundler (déjà géré par `mobile/ios/Gemfile`)
- Un moteur pour MariaDB : **Docker/Podman** (recommandé, comme le reste du projet)
  ou MariaDB via Homebrew
- Un identifiant Apple (un compte gratuit suffit pour installer sur son propre
  appareil ; voir §4)

Sur l'iPhone :

- iOS à jour, connecté au **même réseau Wi-Fi** que le Mac
- Câble USB-C / Lightning pour le premier déploiement

---

## 1. Récupérer l'IP locale du MacBook

```bash
ipconfig getifaddr en0        # Wi-Fi ; renvoie p. ex. 192.168.1.14
```

Notez cette adresse. Elle est déjà renseignée dans
`mobile/src/infrastructure/http/api-config.ts` (`LAN_HOST`).

> **Stabilité** : le routeur peut réattribuer une autre IP au Mac après un
> redémarrage (bail DHCP). Pour éviter d'avoir à modifier le code à chaque fois,
> réservez l'adresse du Mac dans l'interface d'administration du routeur
> (« DHCP reservation » / « bail statique »).

Si l'IP obtenue n'est **pas** `192.168.1.14`, modifiez `LAN_HOST` dans
`api-config.ts` en conséquence, puis reconstruisez l'app (§5).

---

## 2. Lancer MariaDB sur le Mac

Avec Docker ou Podman :

```bash
docker run -d --name havefun-mariadb \
  -e MARIADB_DATABASE=havefun_courses \
  -e MARIADB_USER=havefun \
  -e MARIADB_PASSWORD=changeme \
  -e MARIADB_ROOT_PASSWORD=changeme \
  -p 3306:3306 \
  mariadb:10.11
```

Le conteneur n'a besoin d'être exposé que **localement** : seule l'API (sur le Mac)
s'y connecte. Aucune config réseau supplémentaire.

---

## 3. Lancer l'API NestJS, joignable sur le réseau local

```bash
cd backend
npm install
cp .env.example .env          # si pas déjà fait ; garder DB_HOST=localhost
npm run migration:run
npm run seed                   # catalogue de démo (idempotent)
npm run start:dev             # ou: npm run build && npm run start:prod
```

L'API écoute sur `0.0.0.0:3000` : elle est donc accessible via l'IP LAN du Mac,
pas seulement `localhost`. CORS est déjà activé côté serveur.

### Ouvrir le pare-feu macOS si besoin

Si le pare-feu applicatif est actif :
**Réglages Système → Réseau → Pare-feu → Options** → autoriser les connexions
entrantes pour `node` (Xcode le demande parfois automatiquement au 1er lancement).

### Vérifier depuis un autre appareil

Depuis l'iPhone (Safari) ou un autre poste du réseau :

```
http://192.168.1.14:3000/docs
```

La page Swagger doit s'afficher. Sinon : même Wi-Fi ? bon SSID (pas la bande
« invités » qui isole les clients) ? pare-feu ?

### Créer un compte de test

```bash
curl -X POST http://192.168.1.14:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"eleve.test@havefun-courses.fr","password":"HaveFun2026!","firstName":"Eleve","lastName":"Test","schoolLevel":"troisieme"}'
```

| Champ | Valeur |
|---|---|
| Email | `eleve.test@havefun-courses.fr` |
| Mot de passe | `HaveFun2026!` |

---

## 4. Signature iOS (une fois)

iOS n'autorise pas d'« APK » : toute app installée sur un appareil doit être
**signée** et l'appareil **provisionné**. Deux options.

### Option A — Compte Apple gratuit (le plus simple)

- Aucun frais.
- Xcode génère un profil de développement lié à votre Apple ID.
- **Limites** : l'app expire au bout de **7 jours** (il faut la réinstaller
  depuis Xcode), 3 apps sideloadées max par appareil.
- Pas de fichier `.ipa` réutilisable : on déploie directement depuis Xcode.

Dans Xcode → `ios/mobile.xcworkspace` → cible **mobile** → onglet
**Signing & Capabilities** :

1. Cocher **Automatically manage signing**.
2. **Team** : ajouter votre Apple ID (`Xcode → Settings → Accounts`), le
   sélectionner (« Personal Team »).
3. Si `com.havefun.courses` est déjà pris par la signature d'un autre compte,
   changer le **Bundle Identifier** en `com.<votrenom>.havefun.courses`.

### Option B — Compte Apple Developer payant (99 $/an)

- Permet de produire un **`.ipa` ad hoc** installable sans Xcode (via Apple
  Configurator ou Finder), valable **1 an**.
- Il faut enregistrer l'**UDID** de l'iPhone dans le portail développeur, ou
  laisser Xcode le faire.
- Procédure d'export en §6.

---

## 5. Installer l'app sur l'iPhone 14 Plus (déploiement direct)

C'est la voie recommandée avec l'**Option A**.

1. Brancher l'iPhone au Mac en USB. Sur l'iPhone : **Faire confiance** à cet
   ordinateur.
2. Préparer les dépendances natives (une fois, ou après ajout de dépendance
   native) :

   ```bash
   cd mobile
   npm install
   cd ios && bundle install && bundle exec pod install && cd ..
   ```

3. Vérifier que `LAN_HOST` dans `mobile/src/infrastructure/http/api-config.ts`
   correspond bien à l'IP du Mac (§1).
4. Construire et installer **en configuration Release** (le bundle JavaScript est
   alors embarqué : l'app n'a **pas** besoin que Metro tourne sur le Mac, elle a
   seulement besoin de l'API) :

   ```bash
   npx react-native run-ios --mode Release --device "iPhone de <votrenom>"
   ```

   Le nom exact de l'appareil s'obtient avec `xcrun xctrace list devices`.
   Alternative : ouvrir `ios/mobile.xcworkspace` dans Xcode, choisir l'iPhone
   comme cible, menu **Product → Scheme → Edit Scheme → Run → Build
   Configuration = Release**, puis ▶️.

5. Au premier lancement, l'iPhone refuse l'app d'un développeur non vérifié :
   **Réglages → Général → VPN et gestion de l'appareil →** votre Apple ID **→
   Faire confiance**.
6. Débrancher le câble. Tant que le Mac (API + MariaDB) tourne et que l'iPhone
   est sur le même Wi-Fi, l'app fonctionne de façon autonome.

### Utilisation quotidienne

Sur le Mac, au démarrage :

```bash
docker start havefun-mariadb
cd backend && npm run start:dev
```

Puis ouvrir l'app sur l'iPhone et se connecter avec le compte de test.

Avec l'Option A, refaire l'étape 4 au moins une fois tous les 7 jours (péremption
du profil).

---

## 6. Option payante : produire un fichier `.ipa` ad hoc

Nécessite l'**Option B**.

1. Enregistrer l'UDID de l'iPhone dans le portail développeur Apple
   (Xcode le propose au branchement).
2. Dans Xcode (`ios/mobile.xcworkspace`), cible **Any iOS Device (arm64)**.
3. **Product → Archive**.
4. Dans l'Organizer : **Distribute App → Release Testing (ad hoc)** →
   signature automatique → **Export**.
5. Le dossier exporté contient `mobile.ipa`.
6. Installer sur l'iPhone :
   - **Apple Configurator** (Mac App Store) : glisser le `.ipa` sur l'appareil ;
   - ou **Finder** : onglet de l'iPhone → glisser le `.ipa` dans la liste des
     fichiers/apps ;
   - ou `xcrun devicectl device install app --device <UDID> mobile.ipa`.

Le `.ipa` reste valable 1 an (durée du certificat de distribution).

---

## 7. Dépannage

| Symptôme | Cause probable / solution |
|---|---|
| App bloquée sur l'écran de connexion, « Erreur réseau » | API non joignable. Tester `http://<IP>:3000/docs` dans Safari sur l'iPhone. |
| Swagger OK dans Safari mais pas dans l'app | `LAN_HOST` obsolète dans `api-config.ts` → corriger et reconstruire (§5.4). |
| Marche puis casse après quelques jours | IP du Mac changée (DHCP) : réserver l'IP au routeur, ou mettre à jour `LAN_HOST`. |
| Marche puis casse après 7 jours (Option A) | Profil de dev expiré : relancer `run-ios --mode Release --device`. |
| `http://` refusé par iOS | `NSAllowsLocalNetworking` est déjà à `true` dans `ios/mobile/Info.plist` (autorise le cleartext vers les IP privées). Ne pas le retirer. |
| Rien ne répond depuis l'iPhone, tout va bien en local sur le Mac | Pare-feu macOS (autoriser `node`) **ou** Wi-Fi « invités » qui isole les clients : rejoindre le SSID principal. |
| Photos / médias qui ne s'affichent pas | Les médias sont servis par la même API : si l'API est joignable, ils le sont aussi. Vérifier que la soumission a bien été uploadée. |
| Émulateur/simulateur au lieu de l'appareil | Préciser `--device "<nom>"` ; lister avec `xcrun xctrace list devices`. |

---

## 8. Notes de sécurité

- Le trafic est en **HTTP clair** sur le réseau local. Acceptable pour un usage
  domestique de développement ; ne pas exposer l'API sur Internet ainsi.
- `.env` du backend contient des secrets de démo (`changeme`). Ne pas réutiliser
  ces valeurs hors du réseau local.
- Ne pas rediriger le port 3000 du routeur vers le Mac (pas d'exposition WAN).
