import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'passions' })
export class PassionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  key!: string;

  @Column({ type: 'varchar', length: 100 })
  label!: string;

  @Column({ type: 'varchar', length: 10 })
  icon!: string;
}
