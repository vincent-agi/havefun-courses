import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmissionStatus } from '../../../domain/entities/submission.js';
import { UserOrmEntity } from './user.orm-entity.js';
import { ChallengeOrmEntity } from './challenge.orm-entity.js';

@Entity({ name: 'submissions' })
export class SubmissionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserOrmEntity;

  @ManyToOne(() => ChallengeOrmEntity)
  @JoinColumn({ name: 'challenge_id' })
  challenge!: ChallengeOrmEntity;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.PENDING,
  })
  status!: SubmissionStatus;

  @Column({ type: 'varchar', length: 500, name: 'media_url', nullable: true })
  mediaUrl!: string | null;

  @CreateDateColumn({ name: 'submitted_at' })
  submittedAt!: Date;

  @Column({ type: 'datetime', name: 'validated_at', nullable: true })
  validatedAt!: Date | null;
}
