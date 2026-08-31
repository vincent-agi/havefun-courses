# Design System

## 1. Direction artistique

Thème sombre par défaut, esthétique "gaming moderne" : contrastes marqués, accents lumineux sur fond sombre, hiérarchie visuelle forte pour un public collège/lycée. Priorité à la lisibilité et à la motivation (progression, récompense) plutôt qu'à la densité d'information.

## 2. Tokens

### Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `color.background.primary` | `#0E0F16` | Fond principal des écrans |
| `color.background.surface` | `#1A1C29` | Cartes, panneaux |
| `color.background.elevated` | `#242739` | Modales, éléments surélevés |
| `color.accent.primary` | `#7C5CFF` | Actions principales, éléments actifs |
| `color.accent.secondary` | `#00E5A0` | Succès, validation, XP gagné |
| `color.accent.warning` | `#FFB020` | Alertes, points d'attention |
| `color.accent.danger` | `#FF5C6C` | Erreurs |
| `color.text.primary` | `#F5F6FA` | Texte principal |
| `color.text.secondary` | `#9A9DB3` | Texte secondaire, légendes |
| `color.border.subtle` | `#2E3145` | Séparateurs, contours discrets |

Contraste texte primaire / fond principal validé AA (ratio ≥ 4.5:1).

### Typographie

| Token | Valeur |
|---|---|
| `font.family.heading` | Sora (fallback système) |
| `font.family.body` | Inter (fallback système) |
| `font.size.xl` | 28 / lignes de titres d'écran |
| `font.size.lg` | 20 / titres de section |
| `font.size.md` | 16 / corps de texte |
| `font.size.sm` | 13 / légendes, métadonnées |

### Espacements

`space.xs=4` · `space.sm=8` · `space.md=16` · `space.lg=24` · `space.xl=32` (échelle en pixels, base 4)

### Radius

`radius.sm=8` (boutons, champs) · `radius.md=16` (cartes) · `radius.lg=24` (modales, écrans de récompense)

## 3. Composants de base

| Composant | Description |
|---|---|
| `Button` | Primaire (accent), secondaire (contour), variantes tailles sm/md/lg. Cible tactile ≥ 44px |
| `QuestCard` | Carte de défi : titre, icône passion, badge niveau scolaire, durée estimée, état (disponible/complété) |
| `XPBar` | Barre de progression d'expérience, animée lors d'un gain |
| `BadgeIcon` | Icône de badge débloqué/verrouillé (état grisé si non obtenu) |
| `PassionTag` | Étiquette de passion sélectionnable, état actif/inactif |
| `StepIndicator` | Indicateur d'étape dans le parcours d'une mission (storytelling → théorie → terrain → preuve) |
| `PhotoUploadField` | Zone de capture/upload photo avec aperçu et annotation |

Les tokens ci-dessus sont la source de vérité ; leur implémentation React Native se trouve dans `mobile/src/presentation/theme/`.

## 4. Accessibilité

- Contraste minimum AA sur tout texte informatif
- Taille de touche minimale 44×44px sur tout élément interactif
- Libellés accessibles (`accessibilityLabel`) sur les composants non textuels (`BadgeIcon`, `PhotoUploadField`)
- Aucune information transmise uniquement par la couleur (ex : état de complétion d'une `QuestCard` porté aussi par une icône/texte)

## 5. Wireframes — écrans clés

### Onboarding — sélection des passions

```
┌───────────────────────────────┐
│  ← Retour            Étape 2/2 │
│                                 │
│   Choisis tes passions          │
│   (plusieurs choix possibles)   │
│                                 │
│  ┌────────┐ ┌────────┐         │
│  │ 🔧 Méca │ │ 🎨 Dessin│  ...   │
│  └────────┘ └────────┘         │
│  ┌────────┐ ┌────────┐         │
│  │ 🎸 Musique│ │ 🛹 Skate│      │
│  └────────┘ └────────┘         │
│                                 │
│        [ Continuer ]            │
└───────────────────────────────┘
```

### Catalogue de défis

```
┌───────────────────────────────┐
│  Quêtes disponibles       ⚙ Filtres│
│  [Niveau ▾] [Durée ▾] [Passion ▾]  │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🛹 L'Héritage de Khéops  │   │
│  │ 3ᵉ · 45 min · Thalès     │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 🎸 Fréquence & Ondes  ✓  │   │
│  │ 2nde · 30 min            │   │
│  └─────────────────────────┘   │
└───────────────────────────────┘
```

### Fiche Mission (déroulement)

```
┌───────────────────────────────┐
│  ● ● ○ ○   Storytelling → Théorie │
│                                 │
│  "Les bâtisseurs de Khéops      │
│   mesuraient les ombres..."     │
│                                 │
│  [Schéma interactif Thalès]     │
│                                 │
│  Ta mesure d'ombre (m) : [___]  │
│  Hauteur du bâton (m)  : [___]  │
│                                 │
│        [ Calculer ]             │
└───────────────────────────────┘
```

### Écran de Récompense

```
┌───────────────────────────────┐
│                                 │
│         🏅  Badge débloqué      │
│        "Scribe de Khéops"       │
│                                 │
│      + 120 XP  ▓▓▓▓▓▓░░░░       │
│                                 │
│   Notion validée : Thalès       │
│                                 │
│   [ Voir mon Pass ]  [ Suite ]  │
└───────────────────────────────┘
```

## 6. Fichier source

Design system maintenu dans un fichier Figma partagé (lien à renseigner par l'équipe design une fois le compte d'organisation créé) ; ce document sert de référence texte synchronisée pour l'équipe technique.
