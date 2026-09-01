import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export function s3ClientFactory(config: ConfigService): S3Client {
  return new S3Client({
    endpoint: config.get<string>('S3_ENDPOINT', 'http://localhost:9000'),
    region: 'us-east-1',
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.get<string>('S3_ACCESS_KEY', 'changeme'),
      secretAccessKey: config.get<string>('S3_SECRET_KEY', 'changeme'),
    },
  });
}
