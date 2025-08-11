import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BannerSliderService } from './banner-slider.service';
import { BannerSliderDto } from './dto/banner-slider.dto';
import { MinioService } from 'src/minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('banner-sliders')
export class BannerSliderController {
  constructor(
    private readonly bannerSliderService: BannerSliderService,
    private readonly minioService: MinioService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Omit<BannerSliderDto, 'id' | 'imageUrl'>,
  ) {
    const imageUrl = await this.minioService.uploadFile(file);
    return this.bannerSliderService.createBannerSlider({
      ...data,
      imageUrl,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bannerSliderService.getBannerSliderById(id);
  }

  @Get()
  async findAll() {
    return this.bannerSliderService.listBannerSliders();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Partial<Omit<BannerSliderDto, 'id'>>,
  ) {
    let imageUrl = data.imageUrl;
    if (file) {
      imageUrl = await this.minioService.uploadFile(file);
    }
    return this.bannerSliderService.updateBannerSlider(id, {
      ...data,
      imageUrl,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bannerSliderService.deleteBannerSlider(id);
  }
}
