import { IsNumber, IsObject, IsOptional, Matches } from 'class-validator';

export class CreateSubmissionDto {
  @IsOptional()
  @Matches(/^\/media\/[0-9a-f-]{36}$/, {
    message: 'mediaUrl must be a path returned by POST /media',
  })
  mediaUrl?: string;

  @IsOptional()
  @IsObject()
  measurements?: Record<string, number>;

  @IsOptional()
  @IsNumber()
  result?: number;

  @IsOptional()
  @IsObject()
  sensorData?: Record<string, unknown>;
}
