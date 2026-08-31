# Guide de contribution

## Workflow Git

Le dépôt suit un modèle **Trunk-Based Development** : `main` reste toujours déployable.

1. Créer une branche depuis `main` : `feature/xxx`, `fix/xxx`, `docs/xxx`, `chore/xxx`
2. Développer, committer par petites étapes cohérentes
3. Ouvrir une Pull Request vers `main` dès que possible (même en brouillon) pour favoriser la revue continue
4. Une PR doit rester focalisée sur un seul sujet ; référencer l'issue traitée (`Closes #12`)
5. Merger uniquement après validation CI et au moins une revue approuvée

## Convention de commit

Le dépôt suit [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>(<scope optionnel>): <description>
```

Types autorisés :

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation uniquement |
| `style` | Formatage, sans impact sur le comportement |
| `refactor` | Changement de code sans ajout de fonctionnalité ni correction |
| `test` | Ajout ou correction de tests |
| `chore` | Maintenance, dépendances, configuration |

Exemples :

```
feat(mobile): ajout de l'écran de sélection des passions
fix(backend): correction du calcul des points XP en cas de soumission tardive
docs: mise à jour du guide d'installation locale
```

## Revue de code

- Toute PR nécessite au moins une revue avant fusion
- Les checks CI (lint, tests, build) doivent être au vert
- Le relecteur vérifie : respect de la Clean Architecture, absence de régression, couverture de tests suffisante sur la logique métier
- Les commentaires de revue non bloquants peuvent être résolus par la personne qui merge

## Style de code

- TypeScript strict activé sur `mobile/` et `backend/`
- Lint et formatage automatisés (ESLint + Prettier), exécutés en pre-commit et en CI
- Respect des principes SOLID et de la séparation des couches définie dans [`docs/architecture.md`](docs/architecture.md)
