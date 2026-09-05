# Guide utilisateur — HaveFun Courses

Ce guide explique comment utiliser l'application **HaveFun Courses** au quotidien. Il s'adresse aux élèves (utilisateurs finaux) et aux enseignants qui accompagnent leur usage.

## 1. Créer un compte

1. Ouvrir l'application sur son téléphone (iOS ou Android).
2. Sur l'écran d'accueil, appuyer sur **S'inscrire**.
3. Renseigner : nom, e-mail, mot de passe, classe (collège/lycée).
4. Valider — un e-mail de confirmation peut être requis selon la configuration du serveur.

Un compte existant se connecte via **Se connecter** (écran `LoginScreen`) avec e-mail et mot de passe.

## 2. Configurer son profil (onboarding)

À la première connexion, un parcours guidé (`OnboardingScreen`) demande :

- la **classe** de l'élève (pour filtrer les notions du programme scolaire) ;
- les **passions** de l'élève (mécanique, dessin, musique, skate, etc.).

Ces informations déterminent les quêtes proposées ensuite. Elles restent modifiables depuis le profil.

## 3. Choisir une quête

L'onglet **Catalogue** (`CatalogueScreen`) liste les défis ("quêtes") disponibles, filtrés selon les passions choisies. Chaque quête affiche :

- la notion théorique abordée (mathématiques, physique, etc.) ;
- le domaine pratique associé (la passion concernée) ;
- la difficulté et la récompense en expérience.

Appuyer sur une quête pour l'ouvrir.

## 4. Réaliser une quête

L'écran de mission (`MissionScreen`) déroule le parcours :

1. **Mise en situation** — un scénario narratif introduit la notion théorique dans le contexte de la passion choisie.
2. **Calculateur de terrain** — un outil guide l'élève pour appliquer la notion (ex. calcul de vitesse, d'angle, de proportion) à partir de mesures réelles.
3. **Preuve de réalisation** — l'élève soumet une preuve :
   - une **photo annotée** de son travail ou de sa mesure ;
   - et/ou une **mesure de capteur** du téléphone (selon la quête), via les capteurs natifs de l'appareil.

Valider la soumission envoie la preuve au serveur pour validation.

## 5. Suivre sa progression

Une fois la quête validée, l'élève reçoit :

- des **points d'expérience** ;
- des **badges métiers** (représentant les compétences pratiques démontrées) ;
- une contribution à son **Pass Compétences ODD 4**, consultable depuis l'onglet **Profil** (`ProfileScreen`).

Le Pass Compétences peut être **exporté en PDF** depuis le profil, pour être partagé (enseignant, dossier scolaire, portfolio personnel).

## 6. Permissions de l'application

Selon les quêtes réalisées, l'application peut demander l'accès :

- à l'**appareil photo** (photo de preuve) ;
- aux **capteurs de mouvement** (accéléromètre, gyroscope, selon la quête) ;
- à la **localisation approximative**, si une quête l'exige.

Ces accès sont demandés au moment où ils sont nécessaires ; ils peuvent être gérés à tout moment dans les réglages du système (iOS : Réglages > HaveFun Courses ; Android : Paramètres > Applications > HaveFun Courses > Autorisations).

## 7. Confidentialité des données

Le traitement des données personnelles (comptes, preuves, mesures) est décrit dans [`rgpd-accessibilite.md`](rgpd-accessibilite.md).

## 8. Problèmes courants

| Symptôme | Piste |
|---|---|
| Impossible de se connecter | Vérifier la connexion internet et l'exactitude de l'e-mail/mot de passe. |
| La photo de preuve ne s'envoie pas | Vérifier la permission caméra et la connexion réseau ; réessayer. |
| Une quête n'apparaît pas dans le catalogue | Vérifier que la passion correspondante est bien sélectionnée dans le profil. |
| L'export PDF du Pass Compétences échoue | Vérifier l'espace de stockage disponible sur l'appareil. |

Pour un problème persistant, contacter l'établissement ou le support du projet.
