import { Injectable, NotFoundException } from '@nestjs/common';
import { BannerSliderDto } from './dto/banner-slider.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResBannerSliderDto } from './dto/resBanner-slider.dto';

@Injectable()
export class BannerSliderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBannerSlider(data: Omit<BannerSliderDto, 'id'>) {
    return await this.prismaService.banner_slider.create({
      data: {
        ...data,
        status:
          typeof data.status == 'string' && data.status == 'true'
            ? true
            : false,
        sequence: Number(data.sequence) || 0,
      },
    });
  }

  async getBannerSliderById(id: string) {
    return await this.prismaService.banner_slider.findUnique({
      where: { id },
    });
  }

  async listBannerSliders(
    page: number = 1,
    pageSize: number = 20,
  ): Promise<ResBannerSliderDto> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.banner_slider.findMany({
        skip,
        take: pageSize,
        orderBy: { sequence: 'asc' },
      }),
      this.prismaService.banner_slider.count(),
    ]);
    return {
      page,
      pageSize,
      total,
      data: items,
    };
  }

  async updateBannerSlider(
    id: string,
    data: Partial<Omit<BannerSliderDto, 'id'>>,
  ) {
    const dataStatus = data.status;
    return await this.prismaService.banner_slider.update({
      where: { id },
      data: {
        ...data,
        ...(dataStatus && {
          status: typeof dataStatus == 'string' && dataStatus == 'true',
        }),
        ...(data.sequence && { sequence: Number(data.sequence) || 0 }),
      },
    });
  }

  async deleteBannerSlider(id: string) {
    return await this.prismaService.banner_slider.delete({
      where: { id },
    });
  }
}
