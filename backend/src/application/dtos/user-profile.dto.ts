import { SchoolLevel } from '../../domain/entities/school-level.js';
import { User } from '../../domain/entities/user.js';

export interface UserProfileDto {
  id: string;
  email: string;
  firstName: string;
  schoolLevel: SchoolLevel | null;
  passionIds: string[];
  xpPoints: number;
}

export function toUserProfileDto(user: User): UserProfileDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    schoolLevel: user.schoolLevel,
    passionIds: user.passionIds,
    xpPoints: user.xpPoints,
  };
}
