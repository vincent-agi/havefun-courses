import { SchoolLevel } from './school-level.js';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  schoolLevel: SchoolLevel | null;
  passionIds: string[];
  xpPoints: number;
  createdAt: Date;
}

export type NewUser = Omit<
  User,
  'id' | 'createdAt' | 'passionIds' | 'schoolLevel' | 'xpPoints'
> & {
  passionIds?: string[];
  schoolLevel?: SchoolLevel | null;
};
