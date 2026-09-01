# Audit RGPD et accessibilité

Audit statique réalisé par revue de code sur l'état actuel du dépôt (fin Milestone 4). Pas d'outillage automatisé exécuté (axe, Lighthouse) faute d'environnement mobile disponible pour cette passe — à compléter par un test manuel sur device avant release V1.0 (cf. Issue #13).

## 1. RGPD — minimisation des données

| Donnée collectée | Nécessaire ? | Constat |
|---|---|---|
| Email, mot de passe (haché bcrypt), prénom | Oui | Strict minimum pour l'authentification |
| Classe (`schoolLevel`), passions | Oui | Cœur de la personnalisation produit |
| Photo de preuve | Oui | Cœur de la mécanique pédagogique (preuve de terrain) |
| Données de capteurs | Oui (optionnel) | Non encore implémenté côté mobile (modèle de données prêt) |
| Date de naissance, nom de famille, adresse | Non collecté | ✅ Conforme au principe de minimisation |

**Constat :** le modèle de données actuel ne collecte aucune donnée non nécessaire au service. Aucune donnée de géolocalisation n'est demandée.

## 2. RGPD — points d'attention à traiter avant release

- [ ] **Consentement explicite mineur** : aucun écran de consentement dédié (parental ou élève) n'existe avant capture photo/caméra. L'app s'appuie uniquement sur la permission système (`react-native-image-picker`), ce qui n'équivaut pas à un consentement RGPD explicite et informé. **À ajouter avant V1.0** : écran d'information + consentement avant la première utilisation de la caméra.
- [ ] **Durée de rétention** : aucune politique de suppression automatique des photos de soumission n'est implémentée. À définir et documenter (ex : suppression après N mois ou fin d'année scolaire).
- [ ] **Droit à l'effacement / à l'accès** : aucun endpoint de suppression de compte ou d'export des données personnelles n'existe. À ajouter (`DELETE /users/me`, export JSON).
- [ ] **Politique de confidentialité** : aucun document CGU/politique de confidentialité rédigé côté produit — hors périmètre technique de ce dépôt mais bloquant pour une mise en production réelle.
- [ ] **Stockage des médias** : les URLs S3/MinIO générées sont présumées pointer vers un bucket dont la politique d'accès (public-read vs privé + URLs signées en lecture) reste à trancher formellement en production. En l'état, `docs/architecture.md` prévoit des URLs signées à durée limitée — l'upload (écriture) est bien signé ; la lecture ne l'est pas encore.

## 3. Sécurité applicative (connexe RGPD)

- Mots de passe hachés avec bcrypt (10 rounds) — ✅
- Authentification JWT stateless, secret configurable via variable d'environnement — ✅
- Endpoints protégés par `JwtAuthGuard` sur toutes les ressources utilisateur — ✅ (vérifié par revue des controllers `users`, `challenges`, `media`, `submissions`)
- `ValidationPipe` global avec `whitelist: true` pour rejeter les champs non attendus dans les payloads — ✅

## 4. Accessibilité — composants mobile

| Composant | Constat |
|---|---|
| `Button` | `accessibilityRole="button"`, `accessibilityLabel` présents |
| `PassionTag` | `accessibilityRole`, `accessibilityState={{selected}}`, label dynamique |
| `QuestCard` | `accessibilityRole`, label incluant l'état "complété" |
| `BadgeIcon` | Label incluant l'état "verrouillé" pour ne pas reposer uniquement sur l'icône 🔒 |
| `StepIndicator` | `accessibilityLabel` annonce l'étape courante sur le conteneur |
| `XPBar` | `accessibilityLabel` annonce la valeur numérique (le remplissage visuel seul ne suffirait pas) |

**Constat :** les composants de base respectent la règle "ne pas transmettre d'information uniquement par la couleur" (design-system.md §4) — chaque état a un équivalent textuel ou une icône distincte.

## 5. Accessibilité — points d'attention à traiter avant release

- [ ] **Contraste réel non mesuré** : les couleurs du design system ont été choisies pour viser AA (`docs/design-system.md`) mais aucun outil de mesure de contraste n'a été exécuté sur le rendu réel. À vérifier avec un outil (ex : Colour Contrast Analyser) avant release.
- [ ] **Taille de touche** : `Button` et `PassionTag` respectent la cible ≥44px (`minHeight: 44/48`). Non vérifié pour tous les éléments interactifs de `MissionScreen` (ex : `TextInput` du calculateur — actuellement 44px, conforme).
- [ ] **Navigation clavier / lecteur d'écran réel** : non testée sur device physique avec VoiceOver/TalkBack. À planifier en test manuel avant V1.0.
- [ ] **Alternative textuelle du schéma théorique** : l'étape "Pouvoir théorique" de `MissionScreen` n'affiche qu'un texte explicatif (pas de schéma interactif visuel à ce stade, cf. limite documentée dans la PR Milestone 3) — de fait, aucun contenu visuel non accessible n'est présent sur cet écran spécifique.

## 6. Prochaines étapes recommandées

1. Ajouter un écran de consentement avant capture photo (bloquant RGPD).
2. Définir et implémenter une politique de rétention des médias.
3. Ajouter les endpoints de suppression/export de compte.
4. Exécuter un audit d'accessibilité automatisé + manuel sur device réel avant la release V1.0.
