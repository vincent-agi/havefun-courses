import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'skills' })
export class SkillOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  key!: string;

  @Column({ type: 'varchar', length: 100 })
  label!: string;

  @Column({ type: 'varchar', length: 50 })
  subject!: string;
}
