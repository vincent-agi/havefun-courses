import { Skill } from '../entities/skill.js';

export const SKILL_REPOSITORY = Symbol('SKILL_REPOSITORY');

export interface SkillRepository {
  findById(id: string): Promise<Skill | null>;
}
