import { ArrayMinSize, IsArray, IsEnum, IsString } from 'class-validator';
import { SchoolLevel } from '../../domain/entities/school-level.js';

export class UpdateOnboardingDto {
  @IsEnum(SchoolLevel)
  schoolLevel!: SchoolLevel;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  passionIds!: string[];
}
