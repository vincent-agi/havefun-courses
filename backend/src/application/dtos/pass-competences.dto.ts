export interface PassCompetenceItemDto {
  challengeTitle: string;
  skillLabel: string;
  subject: string;
  passionLabel: string;
  validatedAt: Date;
}

export interface PassCompetencesDto {
  firstName: string;
  totalXp: number;
  items: PassCompetenceItemDto[];
}
