import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type MediaAssetRepository } from '../../../domain/repositories/media-asset.repository.js';
import {
  MediaAsset,
  NewMediaAsset,
} from '../../../domain/entities/media-asset.js';
import { MediaAssetOrmEntity } from '../orm-entities/media-asset.orm-entity.js';

function toDomain(entity: MediaAssetOrmEntity): MediaAsset {
  return {
    id: entity.id,
    ownerId: entity.ownerId,
    mimeType: entity.mimeType,
    sizeBytes: entity.sizeBytes,
    storagePath: entity.storagePath,
    createdAt: entity.createdAt,
  };
}

@Injectable()
export class TypeOrmMediaAssetRepository implements MediaAssetRepository {
  constructor(
    @InjectRepository(MediaAssetOrmEntity)
    private readonly repository: Repository<MediaAssetOrmEntity>,
  ) {}

  async create(asset: NewMediaAsset): Promise<MediaAsset> {
    const entity = this.repository.create(asset);
    const saved = await this.repository.save(entity);
    return toDomain(saved);
  }

  async findById(id: string): Promise<MediaAsset | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? toDomain(entity) : null;
  }
}
