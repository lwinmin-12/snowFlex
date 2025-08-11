import { Module } from '@nestjs/common';
import { BannerSliderService } from './banner-slider.service';
import { BannerSliderController } from './banner-slider.controller';
import { MinioModule } from 'src/minio/minio.module';

@Module({
    imports: [MinioModule], 
  controllers: [BannerSliderController],
  providers: [BannerSliderService],
})
export class BannerSliderModule {}
