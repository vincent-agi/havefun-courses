import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'media_assets' })
export class MediaAssetOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 36, name: 'owner_id' })
  ownerId!: string;

  @Column({ type: 'varchar', length: 64, name: 'mime_type' })
  mimeType!: string;

  @Column({ type: 'int', name: 'size_bytes' })
  sizeBytes!: number;

  @Column({ type: 'varchar', length: 512, name: 'storage_path' })
  storagePath!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
