import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repositories/user.repository.js';
import { NewUser, User } from '../../../domain/entities/user.js';
import { SchoolLevel } from '../../../domain/entities/school-level.js';
import { UserOrmEntity } from '../orm-entities/user.orm-entity.js';
import { PassionOrmEntity } from '../orm-entities/passion.orm-entity.js';

function toDomain(entity: UserOrmEntity): User {
  return {
    id: entity.id,
    email: entity.email,
    passwordHash: entity.passwordHash,
    firstName: entity.firstName,
    schoolLevel: entity.schoolLevel,
    passionIds: (entity.passions ?? []).map((p) => p.id),
    xpPoints: entity.xpPoints,
    createdAt: entity.createdAt,
  };
}

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
    @InjectRepository(PassionOrmEntity)
    private readonly passionRepository: Repository<PassionOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: { passions: true },
    });
    return entity ? toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { email },
      relations: { passions: true },
    });
    return entity ? toDomain(entity) : null;
  }

  async create(user: NewUser): Promise<User> {
    const entity = this.repository.create({
      email: user.email,
      passwordHash: user.passwordHash,
      firstName: user.firstName,
      schoolLevel: user.schoolLevel ?? null,
    });
    const saved = await this.repository.save(entity);
    return toDomain(saved);
  }

  async updateOnboarding(
    id: string,
    data: { schoolLevel: SchoolLevel; passionIds: string[] },
  ): Promise<User> {
    const entity = await this.repository.findOneOrFail({ where: { id } });
    entity.schoolLevel = data.schoolLevel;
    entity.passions = await this.passionRepository.findBy({
      id: In(data.passionIds),
    });
    const saved = await this.repository.save(entity);
    return toDomain(saved);
  }

  async addXp(id: string, amount: number): Promise<User> {
    await this.repository.increment({ id }, 'xpPoints', amount);
    const entity = await this.repository.findOneOrFail({
      where: { id },
      relations: { passions: true },
    });
    return toDomain(entity);
  }
}
