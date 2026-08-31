import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity.js';
import { BadgeOrmEntity } from './badge.orm-entity.js';

@Entity({ name: 'user_badges' })
export class UserBadgeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserOrmEntity;

  @ManyToOne(() => BadgeOrmEntity, { eager: true })
  @JoinColumn({ name: 'badge_id' })
  badge!: BadgeOrmEntity;

  @CreateDateColumn({ name: 'earned_at' })
  earnedAt!: Date;
}
