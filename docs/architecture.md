# Architecture technique

## 1. Vue d'ensemble

```
┌─────────────────────────┐        HTTPS / REST + JWT        ┌──────────────────────────┐
│   mobile/ (React Native) │ ────────────────────────────────▶│   backend/ (NestJS)      │
│   présentation + état    │ ◀────────────────────────────────│   API REST               │
└─────────────────────────┘                                   └──────────────────────────┘
                                                                        │        │
                                                                        ▼        ▼
                                                              ┌────────────┐ ┌─────────────┐
                                                              │  MariaDB   │ │ S3 / MinIO   │
                                                              │ (données)  │ │ (médias)     │
                                                              └────────────┘ └─────────────┘
```

Deux applications découplées dans un même dépôt (`mobile/`, `backend/`), communiquant exclusivement via une API REST authentifiée par JWT. Aucune logique métier partagée directement en code entre les deux — chaque application possède sa propre couche domaine.

## 2. Front-end mobile — React Native

**Choix : React Native (TypeScript)**, plutôt que Flutter.

Justification :
- Écosystème JavaScript/TypeScript partagé avec le backend NestJS → montée en compétence facilitée pour l'équipe
- Large disponibilité de bibliothèques matures pour caméra, capteurs (accéléromètre/gyroscope), stockage local
- Alternative écartée : Flutter (Dart) — écosystème solide mais introduit un second langage sans bénéfice décisif pour le périmètre du MVP

### Découpage en couches (Clean Architecture)

```
mobile/src/
├── domain/           # Entités métier, interfaces de repositories, cas d'usage (use-cases)
├── application/       # Orchestration des use-cases, state management
├── infrastructure/    # Implémentations concrètes : client HTTP, stockage local, capteurs, caméra
└── presentation/       # Écrans, composants UI, navigation
```

- `domain/` ne dépend d'aucune autre couche ni d'aucune librairie React Native — testable en isolation
- `presentation/` ne connaît que les cas d'usage exposés par `application/`, jamais `infrastructure/` directement
- Injection de dépendances pour découpler `domain/` des implémentations `infrastructure/` (ex : `ChallengeRepository` interface en domaine, implémentation HTTP en infrastructure)

## 3. Backend — NestJS

**Choix : NestJS (TypeScript), API REST, authentification JWT.**

Justification :
- Structure modulaire de NestJS colle naturellement à la Clean Architecture (modules, providers, injection de dépendances native)
- REST plutôt que GraphQL : surface d'API du MVP reste simple (CRUD + quelques actions métier), REST suffit et réduit la complexité d'outillage côté mobile
- JWT : authentification stateless, adaptée à une app mobile multi-device sans session serveur à maintenir

### Découpage en couches (Clean Architecture)

```
backend/src/
├── domain/            # Entités métier, interfaces de repositories, règles métier pures
├── application/        # Use-cases (services applicatifs), DTOs d'entrée/sortie
├── infrastructure/     # Repositories TypeORM/Prisma, client S3/MinIO, envoi d'emails, JWT strategy
└── presentation/        # Controllers REST, modules NestJS, validation des requêtes (guards, pipes)
```

- Un module NestJS par domaine métier (`users`, `challenges`, `submissions`, `gamification`, `pass-competences`)
- Les controllers ne contiennent aucune logique métier : ils valident l'entrée et délèguent aux use-cases de `application/`
- Les entités `domain/` sont indépendantes de l'ORM ; le mapping vers les entités persistées se fait dans `infrastructure/`

## 4. Base de données — MariaDB

**Choix : MariaDB**, plutôt que PostgreSQL.

Justification :
- Modèle relationnel adapté : entités fortement liées (`User` ↔ `Passion`, `Challenge` ↔ `Submission` ↔ `Badge`), intégrité référentielle native nécessaire
- Alternative écartée : PostgreSQL — équivalent en robustesse pour ce périmètre, MariaDB retenue pour coût d'hébergement et simplicité d'exploitation

Schéma conceptuel détaillé (entités `User`, `Passion`, `Skill`, `Challenge`, `Submission`, `Badge`) documenté et versionné dans les migrations du backend (cf. Issue #4 — Modélisation de la base de données).

## 5. Stockage des médias

**Choix : S3-compatible, MinIO en environnement local/self-hosted, S3 (ou équivalent managé) en production.**

Justification :
- Les preuves photo (Issue #3.3) ne doivent pas transiter ni être stockées dans MariaDB : stockage objet dédié, URLs signées à durée limitée
- MinIO permet un environnement de développement local strictement identique à la production (même API S3)

## 6. Principes transverses

- **SOLID** appliqué systématiquement : une classe/service a une seule responsabilité, dépendances injectées via interfaces plutôt qu'implémentations concrètes
- **Testabilité** : la couche `domain/` de chaque application est testable unitairement sans dépendance externe (pas de DB, pas de réseau)
- **Pas de couplage direct** entre `mobile/` et `backend/` : tout contrat d'échange passe par l'API REST versionnée et documentée (OpenAPI, cf. Issue #14)

## 7. Évolutivité

Le modèle de données et le découpage en modules sont pensés pour accueillir, sans refonte :
- de nouvelles matières et passions (extension du catalogue `Challenge` par configuration, pas par code)
- une montée en charge multi-établissements (le modèle `User` prévoit un rattachement futur à une entité établissement, non implémenté au MVP)
