import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { GetPassCompetencesUseCase } from './get-pass-competences.use-case.js';

@Injectable()
export class GeneratePassCompetencesPdfUseCase {
  constructor(
    private readonly getPassCompetencesUseCase: GetPassCompetencesUseCase,
  ) {}

  async execute(userId: string): Promise<Buffer> {
    const pass = await this.getPassCompetencesUseCase.execute(userId);

    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    const donePromise = new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    doc.fontSize(20).text('Pass Compétences', { align: 'left' });
    doc
      .fontSize(10)
      .fillColor('#666')
      .text("Contribue à l'ODD 4 de l'ONU — Éducation de Qualité");
    doc.moveDown(1.5);

    doc.fillColor('#000').fontSize(14).text(`Élève : ${pass.firstName}`);
    doc.fontSize(14).text(`Expérience totale : ${pass.totalXp} XP`);
    doc.moveDown(1);

    doc.fontSize(16).text('Compétences validées');
    doc.moveDown(0.5);

    if (pass.items.length === 0) {
      doc
        .fontSize(11)
        .fillColor('#666')
        .text('Aucune compétence validée pour le moment.');
    }

    for (const item of pass.items) {
      const validatedDate = new Date(item.validatedAt).toLocaleDateString(
        'fr-FR',
      );
      doc
        .fontSize(12)
        .fillColor('#000')
        .text(
          `• ${item.skillLabel} (${item.subject}) — via "${item.challengeTitle}"`,
        );
      doc
        .fontSize(10)
        .fillColor('#666')
        .text(`   Passion : ${item.passionLabel} · Validé le ${validatedDate}`);
      doc.moveDown(0.3);
    }

    doc.end();
    return donePromise;
  }
}
