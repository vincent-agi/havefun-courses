import { Badge } from '../../domain/entities/badge.js';

export interface ValidationResultDto {
  xpAwarded: number;
  totalXp: number;
  badgesAwarded: Badge[];
}
