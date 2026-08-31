import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { SchoolLevel } from '../../domain/entities/school-level.js';

export class ChallengeFiltersDto {
  @IsOptional()
  @IsEnum(SchoolLevel)
  schoolLevel?: SchoolLevel;

  @IsOptional()
  @IsString()
  passionId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxDurationMinutes?: number;
}
