import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { S3_CLIENT } from '../../../infrastructure/storage/s3-client.token.js';
import { s3ClientFactory } from '../../../infrastructure/storage/s3-client.factory.js';
import { GenerateUploadUrlUseCase } from '../../../application/use-cases/media/generate-upload-url.use-case.js';
import { MediaController } from '../../controllers/media.controller.js';

@Module({
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MediaController],
  providers: [
    {
      provide: S3_CLIENT,
      inject: [ConfigService],
      useFactory: s3ClientFactory,
    },
    GenerateUploadUrlUseCase,
  ],
})
export class MediaModule {}
