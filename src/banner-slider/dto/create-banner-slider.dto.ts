import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBannerSliderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  @IsUUID()
  contentId?: string;

  @IsOptional()
  @IsString()
  webUrl?: string;

  @IsString()
  @IsNotEmpty()
  status: boolean;

  @IsInt()
  @IsNotEmpty()
  sequence: number;

  @IsEnum(['Content', 'Web', 'Image'])
  @IsNotEmpty()
  adType: 'Content' | 'Web' | 'Image';
}
