# havefun-courses

Application mobile qui aide les collégiens et lycéens à appliquer les notions théoriques (Mathématiques, Physique...) à leurs passions réelles (Mécanique, Dessin, Musique, Skate) à travers des défis de terrain concrets et ludiques.

Le projet s'inscrit dans le cadre de l'**ODD 4 de l'ONU — Éducation de Qualité** : rendre l'apprentissage accessible, concret et motivant, en connectant la théorie scolaire à des pratiques que l'élève choisit lui-même.

## Comment ça marche

1. L'élève renseigne sa classe et sélectionne ses passions.
2. Il choisit un défi ("Quête") dans un catalogue filtré selon ses centres d'intérêt.
3. Chaque quête introduit une notion théorique via une mise en situation narrative, puis un calculateur de terrain guide l'élève dans l'application pratique.
4. L'élève soumet une preuve (photo annotée, mesure de capteurs).
5. La validation débloque de l'expérience, des badges métiers et alimente son Pass Compétences ODD 4, exportable en PDF.

## Stack technique

| Composant | Choix |
|---|---|
| Mobile | React Native (TypeScript) |
| Backend | NestJS (TypeScript), API REST, authentification JWT |
| Base de données | MariaDB |
| Stockage médias | S3-compatible (MinIO en local) |
| Architecture | Clean Architecture (domaine / cas d'usage / infrastructure / présentation), principes SOLID |

Le détail des choix et leurs justifications sont documentés dans [`docs/architecture.md`](docs/architecture.md). La charte graphique et les composants sont documentés dans [`docs/design-system.md`](docs/design-system.md).

## Structure du dépôt

```
havefun-courses/
├── mobile/     # Application React Native
├── backend/    # API NestJS
└── docs/       # Architecture, design system, guides
```

## Installation locale

### Prérequis

- Node.js 20+
- npm 10+
- MariaDB 10.x (local ou conteneur)
- Xcode (build iOS) et/ou Android Studio (build Android)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # renseigner les accès MariaDB et le secret JWT
npm run migration:run
npm run start:dev
```

### Mobile

```bash
cd mobile
npm install
npm run ios      # ou npm run android
```

## Contribuer

Voir [`CONTRIBUTING.md`](CONTRIBUTING.md) pour le workflow Git, les conventions de commit et le process de revue.

## Licence

À définir.
