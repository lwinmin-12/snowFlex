import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Type, Transform, Expose } from 'class-transformer';

export class BannerSliderDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  @IsUUID()
  contentId?: string | null;

  @IsOptional()
  @IsString()
  webUrl?: string | null;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsInt()
  @IsNotEmpty()
  sequence: number;

  @IsEnum(['Content', 'Web', 'Image'])
  @IsNotEmpty()
  adType: 'Content' | 'Web' | 'Image';
}
