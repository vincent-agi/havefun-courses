import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchoolLevel } from '../../../domain/entities/school-level.js';
import { type CalculatorSchema } from '../../../domain/entities/calculator-schema.js';
import {
  type GuidedExperiment,
  type AutonomousChallenge,
} from '../../../domain/entities/challenge.js';
import { PassionOrmEntity } from './passion.orm-entity.js';
import { SkillOrmEntity } from './skill.orm-entity.js';

@Entity({ name: 'challenges' })
export class ChallengeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'enum', enum: SchoolLevel, name: 'school_level' })
  schoolLevel!: SchoolLevel;

  @Column({ type: 'int', name: 'duration_minutes' })
  durationMinutes!: number;

  @ManyToOne(() => PassionOrmEntity, { eager: true })
  @JoinColumn({ name: 'passion_id' })
  passion!: PassionOrmEntity;

  @ManyToOne(() => SkillOrmEntity, { eager: true })
  @JoinColumn({ name: 'skill_id' })
  skill!: SkillOrmEntity;

  @Column({ type: 'text', name: 'narrative_intro' })
  narrativeIntro!: string;

  @Column({ type: 'text', name: 'theory_explanation' })
  theoryExplanation!: string;

  @Column({ type: 'json', name: 'calculator_schema' })
  calculatorSchema!: CalculatorSchema;

  @Column({ type: 'varchar', length: 64, name: 'notion_key', nullable: true })
  notionKey!: string | null;

  @Column({ type: 'json', name: 'guided_experiment', nullable: true })
  guidedExperiment!: GuidedExperiment | null;

  @Column({ type: 'json', name: 'autonomous_challenge', nullable: true })
  autonomousChallenge!: AutonomousChallenge | null;

  @Column({ type: 'int', name: 'xp_reward', default: 100 })
  xpReward!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
