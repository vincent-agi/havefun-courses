import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module.js';
import {
  LocalMediaStorage,
  MEDIA_STORAGE,
} from '../../../infrastructure/storage/media-storage.js';
import { UploadMediaUseCase } from '../../../application/use-cases/media/upload-media.use-case.js';
import { GetMediaUseCase } from '../../../application/use-cases/media/get-media.use-case.js';
import { MediaController } from '../../controllers/media.controller.js';

@Module({
  imports: [
    ConfigModule,
    PersistenceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MediaController],
  providers: [
    { provide: MEDIA_STORAGE, useClass: LocalMediaStorage },
    UploadMediaUseCase,
    GetMediaUseCase,
  ],
})
export class MediaModule {}
