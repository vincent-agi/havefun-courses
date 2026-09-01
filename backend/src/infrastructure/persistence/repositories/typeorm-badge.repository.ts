import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type BadgeRepository } from '../../../domain/repositories/badge.repository.js';
import { Badge } from '../../../domain/entities/badge.js';
import { EarnedBadge } from '../../../domain/entities/earned-badge.js';
import { BadgeOrmEntity } from '../orm-entities/badge.orm-entity.js';
import { UserBadgeOrmEntity } from '../orm-entities/user-badge.orm-entity.js';
import { UserOrmEntity } from '../orm-entities/user.orm-entity.js';

function toDomain(entity: BadgeOrmEntity): Badge {
  return {
    id: entity.id,
    key: entity.key,
    label: entity.label,
    description: entity.description,
    iconUrl: entity.iconUrl,
  };
}

@Injectable()
export class TypeOrmBadgeRepository implements BadgeRepository {
  constructor(
    @InjectRepository(BadgeOrmEntity)
    private readonly badgeRepository: Repository<BadgeOrmEntity>,
    @InjectRepository(UserBadgeOrmEntity)
    private readonly userBadgeRepository: Repository<UserBadgeOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async findAll(): Promise<Badge[]> {
    const entities = await this.badgeRepository.find({
      order: { label: 'ASC' },
    });
    return entities.map(toDomain);
  }

  async findByKey(key: string): Promise<Badge | null> {
    const entity = await this.badgeRepository.findOne({ where: { key } });
    return entity ? toDomain(entity) : null;
  }

  async findEarnedByUser(userId: string): Promise<EarnedBadge[]> {
    const entities = await this.userBadgeRepository.find({
      where: { user: { id: userId } },
      relations: { badge: true },
      order: { earnedAt: 'DESC' },
    });
    return entities.map((entity) => ({
      badge: toDomain(entity.badge),
      earnedAt: entity.earnedAt,
    }));
  }

  async hasEarned(userId: string, badgeId: string): Promise<boolean> {
    const count = await this.userBadgeRepository.count({
      where: { user: { id: userId }, badge: { id: badgeId } },
    });
    return count > 0;
  }

  async award(userId: string, badgeId: string): Promise<boolean> {
    const alreadyEarned = await this.hasEarned(userId, badgeId);
    if (alreadyEarned) return false;

    const user = await this.userRepository.findOneBy({ id: userId });
    const badge = await this.badgeRepository.findOneBy({ id: badgeId });
    if (!user || !badge) {
      throw new NotFoundException('Utilisateur ou badge introuvable.');
    }

    const entity = this.userBadgeRepository.create({ user, badge });
    await this.userBadgeRepository.save(entity);
    return true;
  }
}
