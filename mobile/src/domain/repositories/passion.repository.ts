import { Passion } from '../entities/passion';

export interface PassionRepository {
  list(): Promise<Passion[]>;
}
