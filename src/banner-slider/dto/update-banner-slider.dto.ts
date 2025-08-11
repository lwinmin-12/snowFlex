import { PartialType } from '@nestjs/mapped-types';
import { CreateBannerSliderDto } from './create-banner-slider.dto';

export class UpdateBannerSliderDto extends PartialType(CreateBannerSliderDto) {}
