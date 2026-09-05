import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ChallengeRepository } from '../../../domain/repositories/challenge.repository.js';
import {
  Challenge,
  ChallengeFilters,
} from '../../../domain/entities/challenge.js';
import { ChallengeOrmEntity } from '../orm-entities/challenge.orm-entity.js';

function toDomain(entity: ChallengeOrmEntity): Challenge {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    schoolLevel: entity.schoolLevel,
    durationMinutes: entity.durationMinutes,
    passionId: entity.passion.id,
    skillId: entity.skill.id,
    narrativeIntro: entity.narrativeIntro,
    theoryExplanation: entity.theoryExplanation,
    calculatorSchema: entity.calculatorSchema,
    notionKey: entity.notionKey ?? null,
    guidedExperiment: entity.guidedExperiment ?? null,
    autonomousChallenge: entity.autonomousChallenge ?? null,
    xpReward: entity.xpReward,
    createdAt: entity.createdAt,
  };
}

@Injectable()
export class TypeOrmChallengeRepository implements ChallengeRepository {
  constructor(
    @InjectRepository(ChallengeOrmEntity)
    private readonly repository: Repository<ChallengeOrmEntity>,
  ) {}

  async findMany(filters: ChallengeFilters): Promise<Challenge[]> {
    const entities = await this.repository.find({
      where: {
        ...(filters.schoolLevel ? { schoolLevel: filters.schoolLevel } : {}),
        ...(filters.passionId ? { passion: { id: filters.passionId } } : {}),
        ...(filters.maxDurationMinutes
          ? { durationMinutes: LessThanOrEqual(filters.maxDurationMinutes) }
          : {}),
      },
      order: { createdAt: 'DESC' },
    });
    return entities.map(toDomain);
  }

  async findById(id: string): Promise<Challenge | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? toDomain(entity) : null;
  }
}
