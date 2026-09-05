# Guide d'installation mobile — iOS & Android

Ce guide s'adresse aux développeurs qui souhaitent builder et lancer l'application mobile **HaveFun Courses** (React Native) sur iOS et/ou Android. Il complète l'[Installation locale](../README.md#installation-locale) du README principal.

## Identifiants de l'application

| Plateforme | Identifiant |
|---|---|
| iOS (Bundle Identifier) | `com.havefun.courses` |
| Android (Application ID) | `com.havefun.courses` |
| Nom affiché | HaveFun Courses |

## 1. Prérequis communs

- Node.js 20+ et npm 10+
- Le dépôt cloné et `npm install` exécuté dans `mobile/`

```bash
cd mobile
npm install
```

## 2. iOS

### Prérequis

- macOS avec [Xcode](https://developer.apple.com/xcode/) installé (App Store), avec au moins une plateforme **iOS Simulator** téléchargée (Xcode > Settings > Components > Platforms).
- [CocoaPods](https://cocoapods.org) via Ruby Bundler.

### Installation des dépendances natives

```bash
cd ios
bundle install          # installe CocoaPods (une seule fois, ou après mise à jour du Gemfile)
bundle exec pod install # installe les pods natifs (à refaire après ajout de dépendance native)
cd ..
```

### Lancer sur simulateur

```bash
npm run ios
```

Pour choisir un simulateur précis :

```bash
npx react-native run-ios --simulator="iPhone 16"
```

### Lancer sur un appareil physique

1. Ouvrir `ios/mobile.xcworkspace` dans Xcode (⚠️ toujours le `.xcworkspace`, pas le `.xcodeproj`, à cause de CocoaPods).
2. Sélectionner l'appareil connecté comme cible de build.
3. Configurer la signature (**Signing & Capabilities**) avec un compte développeur Apple.
4. Lancer avec ▶️ dans Xcode, ou :

```bash
npx react-native run-ios --device "Nom de l'appareil"
```

### Problèmes courants

| Symptôme | Solution |
|---|---|
| `Unable to find a destination matching...` | Le simulateur demandé n'est pas installé. Installer la plateforme correspondante dans Xcode > Settings > Components, ou lister les simulateurs disponibles avec `xcrun simctl list devices available`. |
| Erreurs de pods après ajout de dépendance | Relancer `bundle exec pod install` dans `ios/`. |
| Build qui échoue après mise à jour de React Native | Nettoyer : `cd ios && rm -rf Pods Podfile.lock && bundle exec pod install`. |

## 3. Android

### Prérequis

- [Android Studio](https://developer.android.com/studio) installé.
- Android SDK installé via Android Studio (SDK Manager), avec au moins une plateforme API correspondant à `targetSdkVersion` (voir `android/build.gradle`).
- Un JDK compatible avec la version d'Android Gradle Plugin utilisée (Android Studio fournit son propre JDK embarqué, recommandé).
- Variable d'environnement `ANDROID_HOME` pointant vers le SDK, par exemple dans `~/.zshrc` :

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
```

### Lancer sur émulateur

1. Créer un émulateur via Android Studio (**Device Manager**) si aucun n'existe.
2. Démarrer l'émulateur.
3. Lancer l'application :

```bash
npm run android
```

### Lancer sur un appareil physique

1. Activer le **mode développeur** et le **débogage USB** sur l'appareil Android.
2. Connecter l'appareil en USB et autoriser le débogage.
3. Vérifier la détection : `adb devices`.
4. Lancer :

```bash
npm run android
```

### Problèmes courants

| Symptôme | Solution |
|---|---|
| `SDK location not found` | Créer `android/local.properties` avec `sdk.dir=/chemin/vers/Android/sdk`, ou définir `ANDROID_HOME`. |
| `adb devices` liste rien | Vérifier le câble USB, le débogage USB activé, et autoriser l'ordinateur sur l'appareil. |
| Build Gradle qui échoue après mise à jour | Nettoyer : `cd android && ./gradlew clean`. |

## 4. Recharger l'application pendant le développement

Le serveur **Metro** doit tourner en parallèle des builds natifs :

```bash
npm start
```

- **Android** : appuyer deux fois sur <kbd>R</kbd>, ou <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>M</kbd> pour le menu développeur.
- **iOS** : appuyer sur <kbd>R</kbd> dans le simulateur.

Le rechargement à chaud (Fast Refresh) applique les modifications de code automatiquement sans étape manuelle.

## 5. Compte de test

Le seed (`npm run seed` côté `backend/`) ne crée que des données de contenu (passions, compétences, défis) — pas de compte utilisateur. Pour se connecter à l'app en local, créer un compte via l'endpoint d'inscription du backend (celui-ci doit tourner, voir [Installation locale](../README.md#installation-locale)) :

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"eleve.test@havefun-courses.fr","password":"HaveFun2026!","firstName":"Eleve","lastName":"Test","schoolLevel":"troisieme"}'
```

Identifiants obtenus (à utiliser sur l'écran **Connexion** de l'app) :

| Champ | Valeur |
|---|---|
| Email | `eleve.test@havefun-courses.fr` |
| Mot de passe | `HaveFun2026!` |

Ce compte est neuf : l'onboarding (classe + passions) reste à faire après la première connexion.

## 6. Générer un build de production

> La publication mobile (stores, signature) est hors périmètre de [`deployment.md`](deployment.md), qui couvre uniquement l'infrastructure serveur.

### Android (APK/AAB signé)

Le projet utilise par défaut le keystore de debug (`android/app/debug.keystore`), impropre à la production. Pour un build signé :

1. Générer un keystore de release (`keytool -genkeypair -v -keystore release.keystore -alias havefun-courses -keyalg RSA -keysize 2048 -validity 10000`), à garder **hors du dépôt**.
2. Référencer ce keystore dans `android/app/build.gradle` (bloc `signingConfigs.release`) via des variables d'environnement ou `gradle.properties` non versionné.
3. Builder :

```bash
cd android
./gradlew bundleRelease   # génère un .aab pour le Play Store
# ou
./gradlew assembleRelease # génère un .apk
```

Le fichier généré se trouve dans `android/app/build/outputs/`.

### iOS (Archive)

Depuis Xcode (`ios/mobile.xcworkspace`) : **Product > Archive**, puis distribution via App Store Connect ou export ad hoc. Nécessite un compte développeur Apple et un certificat de distribution configuré dans **Signing & Capabilities**.
