import { SchoolLevel } from '../../domain/entities/school-level.js';

export interface ChallengeSummaryDto {
  id: string;
  title: string;
  description: string;
  schoolLevel: SchoolLevel;
  durationMinutes: number;
  passion: { id: string; key: string; label: string; icon: string };
  skill: { id: string; key: string; label: string; subject: string };
}
