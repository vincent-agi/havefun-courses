import { IsIn, IsString } from 'class-validator';

const ALLOWED_CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export class UploadUrlRequestDto {
  @IsString()
  @IsIn(ALLOWED_CONTENT_TYPES)
  contentType!: string;
}

export interface UploadUrlResponseDto {
  uploadUrl: string;
  mediaUrl: string;
  expiresInSeconds: number;
}
