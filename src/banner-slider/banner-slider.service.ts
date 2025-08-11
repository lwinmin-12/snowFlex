import { Injectable } from '@nestjs/common';
import { CreateBannerSliderDto } from './dto/create-banner-slider.dto';
import { UpdateBannerSliderDto } from './dto/update-banner-slider.dto';
import { BannerSliderDto } from './dto/banner-slider.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerSliderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBannerSlider(data: Omit<BannerSliderDto, 'id'>) {
    return await this.prismaService.banner_slider.create({
      data,
    });
  }

  async getBannerSliderById(id: string) {
    return await this.prismaService.banner_slider.findUnique({
      where: { id },
    });
  }

  async listBannerSliders() {
    return await this.prismaService.banner_slider.findMany({
      orderBy: { sequence: 'asc' },
    });
  }

  async updateBannerSlider(
    id: string,
    data: Partial<Omit<BannerSliderDto, 'id'>>
  ) {
    return await this.prismaService.banner_slider.update({
      where: { id },
      data,
    });
  }

  async deleteBannerSlider(id: string) {
    return await this.prismaService.banner_slider.delete({
      where: { id },
    });
  }
}
