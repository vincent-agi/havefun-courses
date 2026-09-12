# webapp — démo web locale

Version navigateur de l'application mobile `havefun-courses`, **sans
authentification**, destinée à une démo locale (salon, présentation, test
enseignant sans installer d'app).

## Principe

La webapp ne réimplémente rien : elle **réutilise tel quel** le code de
`../mobile` (écrans, navigation, domaine, cas d'usage, repositories HTTP) via
[`react-native-web`](https://necolas.github.io/react-native-web/) et Vite.

Seuls les modules strictement natifs sont remplacés par un shim web
(`src/shims/`) :

| Module mobile | Shim web | Rôle |
|---|---|---|
| `infrastructure/http/api-config` | `api-config.ts` | cible toujours `http://localhost:3000` (surchargeable via `VITE_API_BASE_URL`) |
| `infrastructure/storage/session-storage` | `session-storage.ts` | renvoie un jeton factice constant → `SessionProvider` passe directement en `signed-in`, l'écran de connexion n'est jamais monté |
| `presentation/components/PhotoUploadField` | `PhotoUploadField.tsx` | `<input type="file">` au lieu de `react-native-image-picker` |
| `infrastructure/http/http-media.repository` | `http-media.repository.ts` | upload d'un vrai `Blob` multipart |
| `infrastructure/http/http-pass-export.repository` | `http-pass-export.repository.ts` | télécharge le PDF en `Blob` → object URL |
| `presentation/screens/profile/ProfileScreen` | `ProfileScreen.tsx` | ouvre le PDF via `window.open` au lieu de `Linking` |
| `react-native-screens`, `react-native-safe-area-context` | stubs | paquets natifs non transpilables par Vite ; non nécessaires sur navigateur |

Le mapping est appliqué dans `vite.config.ts` (plugin `mobile-web-shims`, sur le
chemin résolu absolu).

## Prérequis : backend en mode démo

Le backend doit tourner avec l'authentification désactivée. Il traite alors
chaque requête comme l'utilisateur de démonstration (`npm run seed`).

```bash
cd ../backend
cp .env.example .env          # renseigner les accès MariaDB
npm run migration:run
npm run seed
AUTH_DISABLED=1 npm run start:dev
```

> `AUTH_DISABLED=1` est réservé à la démo locale — ne jamais l'activer en
> production.

## Lancer la webapp

```bash
npm install
npm run dev            # http://localhost:5173
```

Build statique :

```bash
npm run build          # -> dist/
npm run preview
```

## Limites connues

- Pas de persistance de session : rafraîchir la page repart de l'état serveur de
  l'utilisateur de démonstration.
- Pas de déconnexion (démo mono-utilisateur).
- Navigation « retour » en cours de mission : utiliser le bouton *retour* du
  navigateur.
