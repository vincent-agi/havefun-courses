import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillRepository } from '../../../domain/repositories/skill.repository.js';
import { Skill } from '../../../domain/entities/skill.js';
import { SkillOrmEntity } from '../orm-entities/skill.orm-entity.js';

@Injectable()
export class TypeOrmSkillRepository implements SkillRepository {
  constructor(
    @InjectRepository(SkillOrmEntity)
    private readonly repository: Repository<SkillOrmEntity>,
  ) {}

  async findById(id: string): Promise<Skill | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity
      ? {
          id: entity.id,
          key: entity.key,
          label: entity.label,
          subject: entity.subject,
        }
      : null;
  }
}
