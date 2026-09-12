import { API_BASE_URL } from './api-config';
import type {
  MediaRepository,
  UploadPhotoResult,
} from '../../../mobile/src/domain/repositories/media.repository';

type UploadResponse = { id: string; url: string };

/**
 * Shim web de `mobile/src/infrastructure/http/http-media.repository.ts`.
 *
 * Sur mobile, `fileUri` est un chemin `file://` et React Native accepte une part
 * FormData `{ uri, name, type }`. Sur le web, `fileUri` est un object URL
 * (`URL.createObjectURL(file)`) produit par `PhotoUploadField` : on le
 * re-télécharge en `Blob` et on l'envoie comme vrai fichier multipart.
 */
export class HttpMediaRepository implements MediaRepository {
  async uploadPhoto(fileUri: string): Promise<UploadPhotoResult> {
    const blob = await fetch(fileUri).then((response) => response.blob());

    const formData = new FormData();
    formData.append('file', blob, 'preuve.jpg');

    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Échec de l'envoi de la photo.");
    }

    const payload = (await response.json()) as UploadResponse;
    return { mediaUrl: payload.url };
  }
}
