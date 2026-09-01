# Guide de déploiement

## 1. Vue d'ensemble

Le backend (`backend/`) est une API NestJS stateless, packagée comme n'importe quelle application Node.js. Le mobile (`mobile/`) est buildé séparément pour iOS/Android via les toolchains natives (Xcode / Gradle) et publié sur les stores — hors périmètre de ce guide, qui couvre l'infrastructure serveur.

```
Client mobile ──HTTPS──▶ API NestJS ──▶ MariaDB
                              │
                              └──▶ S3 / MinIO (médias)
```

## 2. Prérequis d'environnement de production

- Node.js 20 LTS
- MariaDB 10.x accessible depuis le serveur applicatif
- Bucket S3-compatible (AWS S3, MinIO auto-hébergé, ou équivalent) avec politique d'accès définie (cf. `docs/rgpd-accessibilite.md` §2 pour le point ouvert sur la lecture des médias)
- Reverse proxy TLS (nginx, Caddy, ou équivalent managé) devant l'API

## 3. Variables d'environnement requises

Voir `backend/.env.example` pour la liste exhaustive. Résumé :

| Variable | Rôle |
|---|---|
| `PORT` | Port d'écoute de l'API |
| `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` | Connexion MariaDB |
| `JWT_SECRET` | Secret de signature des tokens — **doit être une valeur forte et unique en production, jamais celle du `.env.example`** |
| `JWT_EXPIRES_IN_SECONDS` | Durée de validité des tokens (secondes) |
| `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY` | Accès au stockage objet |

Aucune valeur sensible ne doit être commitée. En production, ces variables sont injectées par la plateforme d'hébergement (secrets manager, variables d'environnement du conteneur, etc.).

## 4. Build et démarrage

```bash
cd backend
npm ci
npm run build
npm run migration:run   # applique les migrations sur la base cible
npm run start:prod      # démarre dist/main.js
```

La documentation API interactive (Swagger) est exposée sur `/docs` une fois l'API démarrée (ex : `https://api.example.com/docs`).

## 5. Migrations de base de données

Les migrations sont versionnées dans `backend/src/infrastructure/persistence/migrations/`. Elles s'exécutent avec `npm run migration:run` et se restaurent avec `npm run migration:revert` (une migration à la fois, dans l'ordre inverse). **Toujours exécuter les migrations avant de démarrer une nouvelle version de l'application**, jamais après.

## 6. Procédure de release

Le dépôt suit un versionnement sémantique (`MAJOR.MINOR.PATCH`) aligné sur les milestones (V0.1 → V1.0).

1. S'assurer que la branche à releaser est à jour avec `main` et que la CI (`Backend CI`, `Mobile CI`) est verte
2. Créer un tag Git `vX.Y.Z` sur le commit de release
3. Exécuter les migrations en attente sur l'environnement cible (voir §5)
4. Déployer le nouveau build backend (build → migration → redémarrage du service)
5. Publier le build mobile correspondant sur les stores (processus de review Apple/Google à anticiper)
6. Vérifier les endpoints critiques post-déploiement (`/auth/login`, `/challenges`, `/docs`)

## 7. Procédure de rollback

1. Redéployer le build backend précédent (image/artifact taggé de la release N-1)
2. Si la release en échec a introduit des migrations, exécuter `npm run migration:revert` autant de fois que nécessaire pour revenir au schéma compatible avec le build précédent, **avant** de redémarrer l'ancien build
3. Vérifier les endpoints critiques comme en §6.6
4. Communiquer l'incident et son impact (cf. absence actuelle de procédure d'astreinte formelle — à définir avant V1.0)

## 8. Observabilité (état actuel)

Aucune solution de logging centralisé ou de monitoring (APM, alerting) n'est encore intégrée au dépôt. **À définir avant la release V1.0** : au minimum, des logs applicatifs structurés et une vérification de santé (`/health` ou équivalent) pour le reverse proxy / orchestrateur.
