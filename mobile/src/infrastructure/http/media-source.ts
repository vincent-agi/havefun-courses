import type { ImageSourcePropType } from 'react-native';
import { API_BASE_URL } from './api-config';
import { sessionStorage } from '../storage/session-storage';

/**
 * Transforme le `mediaUrl` relatif stocké sur une soumission ("/media/<id>")
 * en URL absolue joignable par le device. Laisse passer une URL déjà absolue.
 */
export function resolveMediaUri(mediaUrl: string): string {
  return /^https?:\/\//.test(mediaUrl)
    ? mediaUrl
    : `${API_BASE_URL}${mediaUrl}`;
}

/**
 * Source prête pour <Image source={...} />, avec l'en-tête d'authentification
 * exigé par `GET /media/:id`. À appeler dans un effet (résultat asynchrone).
 */
export async function buildMediaImageSource(
  mediaUrl: string | null | undefined,
): Promise<ImageSourcePropType | null> {
  if (!mediaUrl) {
    return null;
  }

  const token = await sessionStorage.getAccessToken();
  return {
    uri: resolveMediaUri(mediaUrl),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };
}
