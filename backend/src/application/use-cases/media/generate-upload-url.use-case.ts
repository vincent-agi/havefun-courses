import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_CLIENT } from '../../../infrastructure/storage/s3-client.token.js';
import { UploadUrlResponseDto } from '../../dtos/upload-url-request.dto.js';

const EXPIRES_IN_SECONDS = 300;
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

@Injectable()
export class GenerateUploadUrlUseCase {
  constructor(
    @Inject(S3_CLIENT)
    private readonly s3Client: S3Client,
    private readonly config: ConfigService,
  ) {}

  async execute(
    userId: string,
    contentType: string,
  ): Promise<UploadUrlResponseDto> {
    const bucket = this.config.get<string>('S3_BUCKET', 'havefun-media');
    const endpoint = this.config.get<string>(
      'S3_ENDPOINT',
      'http://localhost:9000',
    );
    const extension = EXTENSIONS[contentType] ?? 'bin';
    const key = `submissions/${userId}/${randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: EXPIRES_IN_SECONDS,
    });

    return {
      uploadUrl,
      mediaUrl: `${endpoint}/${bucket}/${key}`,
      expiresInSeconds: EXPIRES_IN_SECONDS,
    };
  }
}
