import { PassExportRepository } from '../../../domain/repositories/pass-export.repository';

export class DownloadPassCompetencesPdfUseCase {
  constructor(private readonly passExportRepository: PassExportRepository) {}

  execute(): Promise<string> {
    return this.passExportRepository.downloadPdf();
  }
}
