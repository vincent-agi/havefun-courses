import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type SubmissionRepository } from '../../../domain/repositories/submission.repository.js';
import {
  NewSubmission,
  Submission,
  SubmissionStatus,
} from '../../../domain/entities/submission.js';
import { SubmissionOrmEntity } from '../orm-entities/submission.orm-entity.js';
import { UserOrmEntity } from '../orm-entities/user.orm-entity.js';
import { ChallengeOrmEntity } from '../orm-entities/challenge.orm-entity.js';

function toDomain(entity: SubmissionOrmEntity): Submission {
  return {
    id: entity.id,
    userId: entity.user.id,
    challengeId: entity.challenge.id,
    status: entity.status,
    mediaUrl: entity.mediaUrl,
    measurements: entity.measurements,
    result: entity.result,
    sensorData: entity.sensorData,
    submittedAt: entity.submittedAt,
    validatedAt: entity.validatedAt,
  };
}

@Injectable()
export class TypeOrmSubmissionRepository implements SubmissionRepository {
  constructor(
    @InjectRepository(SubmissionOrmEntity)
    private readonly repository: Repository<SubmissionOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
    @InjectRepository(ChallengeOrmEntity)
    private readonly challengeRepository: Repository<ChallengeOrmEntity>,
  ) {}

  async create(submission: NewSubmission): Promise<Submission> {
    const user = await this.userRepository.findOneBy({ id: submission.userId });
    const challenge = await this.challengeRepository.findOneBy({
      id: submission.challengeId,
    });
    if (!user || !challenge) {
      throw new NotFoundException('Utilisateur ou défi introuvable.');
    }

    const entity = this.repository.create({
      user,
      challenge,
      mediaUrl: submission.mediaUrl,
      measurements: submission.measurements,
      result: submission.result,
      sensorData: submission.sensorData,
    });
    const saved = await this.repository.save(entity);
    return toDomain(saved);
  }

  async findById(id: string): Promise<Submission | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: { user: true, challenge: true },
    });
    return entity ? toDomain(entity) : null;
  }

  async findByUser(userId: string): Promise<Submission[]> {
    const entities = await this.repository.find({
      where: { user: { id: userId } },
      relations: { user: true, challenge: true },
      order: { submittedAt: 'DESC' },
    });
    return entities.map(toDomain);
  }

  async updateStatus(
    id: string,
    status: SubmissionStatus,
  ): Promise<Submission> {
    await this.repository.update(
      { id },
      {
        status,
        validatedAt: status === SubmissionStatus.VALIDATED ? new Date() : null,
      },
    );
    const entity = await this.repository.findOneOrFail({
      where: { id },
      relations: { user: true, challenge: true },
    });
    return toDomain(entity);
  }

  async countByUserAndSkill(
    userId: string,
    skillId: string,
    status: SubmissionStatus,
  ): Promise<number> {
    return this.repository.count({
      where: {
        user: { id: userId },
        challenge: { skill: { id: skillId } },
        status,
      },
    });
  }

  async countByUserAndPassion(
    userId: string,
    passionId: string,
    status: SubmissionStatus,
  ): Promise<number> {
    return this.repository.count({
      where: {
        user: { id: userId },
        challenge: { passion: { id: passionId } },
        status,
      },
    });
  }
}
