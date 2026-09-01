import { IsNumber, IsObject, IsOptional, IsUrl } from 'class-validator';

export class CreateSubmissionDto {
  @IsOptional()
  @IsUrl({ require_tld: false })
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
