/**
 * Module vide : cible d'alias pour les paquets natifs jamais atteints sur le web
 * (`react-native-image-picker`, `react-native-fs`). Leurs seuls importeurs
 * (`PhotoUploadField`, `http-pass-export.repository`) sont déjà remplacés par un
 * shim web.
 */
export default {};
