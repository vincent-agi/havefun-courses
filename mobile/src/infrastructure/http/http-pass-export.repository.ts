import RNFS from 'react-native-fs';
import { API_BASE_URL } from './api-config';
import { sessionStorage } from '../storage/session-storage';
import { PassExportRepository } from '../../domain/repositories/pass-export.repository';

export class HttpPassExportRepository implements PassExportRepository {
  async downloadPdf(): Promise<string> {
    const token = await sessionStorage.getAccessToken();
    const destination = `${RNFS.DocumentDirectoryPath}/pass-competences.pdf`;

    const result = await RNFS.downloadFile({
      fromUrl: `${API_BASE_URL}/users/me/pass-competences/pdf`,
      toFile: destination,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }).promise;

    if (result.statusCode !== 200) {
      throw new Error('Impossible de télécharger le Pass Compétences.');
    }

    return destination;
  }
}
