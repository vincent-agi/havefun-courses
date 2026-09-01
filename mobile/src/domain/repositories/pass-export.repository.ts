export interface PassExportRepository {
  downloadPdf(): Promise<string>;
}
