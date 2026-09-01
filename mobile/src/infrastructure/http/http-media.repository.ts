import { httpClient } from './http-client';
import {
  MediaRepository,
  UploadUrlResult,
} from '../../domain/repositories/media.repository';

export class HttpMediaRepository implements MediaRepository {
  async requestUploadUrl(contentType: string): Promise<UploadUrlResult> {
    return httpClient.post<UploadUrlResult>('/media/upload-url', {
      contentType,
    });
  }

  async uploadFile(
    uploadUrl: string,
    fileUri: string,
    contentType: string,
  ): Promise<void> {
    const fileResponse = await fetch(fileUri);
    const blob = await fileResponse.blob();

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: blob,
    });

    if (!uploadResponse.ok) {
      throw new Error("Échec de l'envoi de la photo.");
    }
  }
}
