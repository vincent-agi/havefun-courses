import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PassionRepository } from '../../../domain/repositories/passion.repository.js';
import { Passion } from '../../../domain/entities/passion.js';
import { PassionOrmEntity } from '../orm-entities/passion.orm-entity.js';

function toDomain(entity: PassionOrmEntity): Passion {
  return {
    id: entity.id,
    key: entity.key,
    label: entity.label,
    icon: entity.icon,
  };
}

@Injectable()
export class TypeOrmPassionRepository implements PassionRepository {
  constructor(
    @InjectRepository(PassionOrmEntity)
    private readonly repository: Repository<PassionOrmEntity>,
  ) {}

  async findAll(): Promise<Passion[]> {
    const entities = await this.repository.find({ order: { label: 'ASC' } });
    return entities.map(toDomain);
  }

  async findByIds(ids: string[]): Promise<Passion[]> {
    if (ids.length === 0) return [];
    const entities = await this.repository.findBy({ id: In(ids) });
    return entities.map(toDomain);
  }
}
