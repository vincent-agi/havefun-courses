import { API_BASE_URL } from './api-config';
import { sessionStorage } from '../storage/session-storage';
import {
  MediaRepository,
  UploadPhotoResult,
} from '../../domain/repositories/media.repository';

const PHOTO_MIME_TYPE = 'image/jpeg';

type UploadResponse = { id: string; url: string };

export class HttpMediaRepository implements MediaRepository {
  async uploadPhoto(fileUri: string): Promise<UploadPhotoResult> {
    const formData = new FormData();
    // React Native accepte cette forme { uri, name, type } pour un fichier local.
    formData.append('file', {
      uri: fileUri,
      name: 'preuve.jpg',
      type: PHOTO_MIME_TYPE,
    } as unknown as Blob);

    const token = await sessionStorage.getAccessToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    // Ne pas fixer Content-Type manuellement : fetch ajoute le boundary multipart.

    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Échec de l'envoi de la photo.");
    }

    const payload = (await response.json()) as UploadResponse;
    return { mediaUrl: payload.url };
  }
}
