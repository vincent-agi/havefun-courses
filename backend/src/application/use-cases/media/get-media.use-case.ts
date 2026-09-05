import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type Readable } from 'node:stream';
import {
  type MediaAssetRepository,
  MEDIA_ASSET_REPOSITORY,
} from '../../../domain/repositories/media-asset.repository.js';
import {
  type MediaStorage,
  MEDIA_STORAGE,
} from '../../../infrastructure/storage/media-storage.js';

export interface MediaFileResult {
  stream: Readable;
  mimeType: string;
  sizeBytes: number;
}

@Injectable()
export class GetMediaUseCase {
  constructor(
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaAssetRepository: MediaAssetRepository,
    @Inject(MEDIA_STORAGE)
    private readonly storage: MediaStorage,
  ) {}

  async execute(id: string): Promise<MediaFileResult> {
    const asset = await this.mediaAssetRepository.findById(id);
    if (!asset) {
      throw new NotFoundException('Média introuvable.');
    }

    return {
      stream: this.storage.createReadStream(asset.storagePath),
      mimeType: asset.mimeType,
      sizeBytes: asset.sizeBytes,
    };
  }
}
