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
  Query,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { BannerSliderService } from './banner-slider.service';
import { BannerSliderDto } from './dto/banner-slider.dto';
import { MinioService } from 'src/minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResBannerSliderDto } from './dto/resBanner-slider.dto';

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
    if (!file) {
      throw new NotFoundException('Image file is required');
    }
    const imageUrl = await this.minioService.uploadFile(file);
    if (!imageUrl) {
      throw new Error('Image upload failed');
    }
    return this.bannerSliderService.createBannerSlider({
      ...data,
      imageUrl,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bannerSliderService.getBannerSliderById(id);
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<ResBannerSliderDto> {
    return this.bannerSliderService.listBannerSliders(page, pageSize);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Partial<Omit<BannerSliderDto, 'id'>>,
  ) {
    let imageUrl = data.imageUrl;

    if (file) {
      imageUrl = await this.minioService.uploadFile(file);
    }

    if (file && !imageUrl) {
      throw new Error('Image upload failed');
    }

    const banner = await this.bannerSliderService.getBannerSliderById(id);

    if (!banner) throw new NotFoundException('Banner not found');

    await this.minioService.deleteFile(banner.imageUrl);

    return this.bannerSliderService.updateBannerSlider(id, {
      ...data,
      imageUrl,
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const banner = await this.bannerSliderService.getBannerSliderById(id);
    if (!banner) throw new NotFoundException('Banner not found');

    await this.minioService.deleteFile(banner.imageUrl);

    return this.bannerSliderService.deleteBannerSlider(id);
  }
}
