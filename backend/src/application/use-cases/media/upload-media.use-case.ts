import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  type MediaAssetRepository,
  MEDIA_ASSET_REPOSITORY,
} from '../../../domain/repositories/media-asset.repository.js';
import {
  type MediaStorage,
  MEDIA_STORAGE,
} from '../../../infrastructure/storage/media-storage.js';
import { MediaResponseDto } from '../../dtos/media-response.dto.js';

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export interface UploadMediaFile {
  buffer: Buffer;
  mimetype: string;
  size: number;
}

@Injectable()
export class UploadMediaUseCase {
  constructor(
    @Inject(MEDIA_STORAGE)
    private readonly storage: MediaStorage,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaAssetRepository: MediaAssetRepository,
  ) {}

  async execute(
    userId: string,
    file?: UploadMediaFile,
  ): Promise<MediaResponseDto> {
    if (!file) {
      throw new UnprocessableEntityException('Aucun fichier fourni.');
    }

    const extension = EXTENSIONS[file.mimetype];
    if (!extension) {
      throw new UnprocessableEntityException(
        'Format non pris en charge (JPEG, PNG ou WebP attendu).',
      );
    }

    const { storagePath } = await this.storage.save(
      userId,
      file.buffer,
      extension,
    );
    const asset = await this.mediaAssetRepository.create({
      ownerId: userId,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      storagePath,
    });

    return { id: asset.id, url: `/media/${asset.id}` };
  }
}
