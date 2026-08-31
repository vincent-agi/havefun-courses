import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchoolLevel } from '../../../domain/entities/school-level.js';
import { PassionOrmEntity } from './passion.orm-entity.js';

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName!: string;

  @Column({
    type: 'enum',
    enum: SchoolLevel,
    name: 'school_level',
    nullable: true,
  })
  schoolLevel!: SchoolLevel | null;

  @ManyToMany(() => PassionOrmEntity)
  @JoinTable({
    name: 'user_passions',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'passion_id', referencedColumnName: 'id' },
  })
  passions!: PassionOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
