export interface PassCompetenceItem {
  challengeTitle: string;
  skillLabel: string;
  subject: string;
  passionLabel: string;
  validatedAt: string;
}

export interface PassCompetences {
  firstName: string;
  totalXp: number;
  items: PassCompetenceItem[];
}
