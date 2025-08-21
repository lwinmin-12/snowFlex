import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';

export class ContentDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  titleMm: string;

  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @IsString()
  descriptionMm: string;

  @IsString()
  descriptionEn: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  videoUrl: string;

  @IsString()
  @IsNotEmpty()
  trailerUrl: string;

  @IsString()
  @IsNotEmpty()
  portraitUrl: string;

  @IsString()
  @IsNotEmpty()
  landscapeUrl: string;

  @IsDateString() 
  @IsNotEmpty()
  releaseDate: Date;

  @IsEnum(['Movie', 'Series'])
  @IsNotEmpty()
  type: 'Movie' | 'Series';

  @IsEnum(['ACTIVE', 'INACTIVE'])
  @IsOptional()
  @Transform(({ value }) => value ?? 'INACTIVE')
  status: 'ACTIVE' | 'INACTIVE';

  @IsBoolean()
  isPremium: boolean;
}
