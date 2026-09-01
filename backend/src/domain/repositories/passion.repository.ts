import { Passion } from '../entities/passion.js';

export const PASSION_REPOSITORY = Symbol('PASSION_REPOSITORY');

export interface PassionRepository {
  findAll(): Promise<Passion[]>;
  findByIds(ids: string[]): Promise<Passion[]>;
}
