import { Platform } from 'react-native';

/**
 * Hôte du backend havefun-courses.
 *
 * - iPhone / iPad physique : IP LAN du MacBook qui héberge l'API, sur le même
 *   Wi-Fi. La récupérer sur le Mac avec `ipconfig getifaddr en0` et mettre à
 *   jour `LAN_HOST` si le routeur attribue une nouvelle adresse (bail DHCP).
 *   Idéalement, réserver l'IP du Mac dans le routeur pour qu'elle soit stable.
 * - Simulateur iOS : `LAN_HOST` fonctionne aussi tant que le Mac est sur le
 *   Wi-Fi ; `localhost` reste utilisable via la valeur `default`.
 * - Émulateur Android : `10.0.2.2` (alias de la machine hôte).
 *
 * Voir docs/guide-reseau-local-ios.md pour la procédure complète.
 */
const LAN_HOST = '192.168.1.14'; // MacBook Air M3 — réseau Wi-Fi domestique
const API_PORT = 3000;

export const API_BASE_URL = Platform.select({
  android: `http://10.0.2.2:${API_PORT}`,
  ios: `http://${LAN_HOST}:${API_PORT}`,
  default: `http://localhost:${API_PORT}`,
});
