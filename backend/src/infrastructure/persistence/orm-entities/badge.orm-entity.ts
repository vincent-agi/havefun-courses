import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'badges' })
export class BadgeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  key!: string;

  @Column({ type: 'varchar', length: 100 })
  label!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 255, name: 'icon_url' })
  iconUrl!: string;
}
