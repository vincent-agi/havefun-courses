import { API_BASE_URL } from './api-config';
import type { PassExportRepository } from '../../../mobile/src/domain/repositories/pass-export.repository';

/**
 * Shim web de `mobile/src/infrastructure/http/http-pass-export.repository.ts`.
 *
 * Pas de système de fichiers ni de `react-native-fs` sur le web : on récupère le
 * PDF en `Blob` et on renvoie un object URL, que `ProfileScreen` (shim web)
 * ouvre dans un nouvel onglet.
 */
export class HttpPassExportRepository implements PassExportRepository {
  async downloadPdf(): Promise<string> {
    const response = await fetch(
      `${API_BASE_URL}/users/me/pass-competences/pdf`,
    );

    if (!response.ok) {
      throw new Error('Impossible de télécharger le Pass Compétences.');
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
}
