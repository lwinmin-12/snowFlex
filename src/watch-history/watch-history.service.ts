import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WatchHistoryDto } from './dto/watch-history.dto';

@Injectable()
export class WatchHistoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async createWatchHistory(
    data: Omit<WatchHistoryDto, 'id' | 'userId'>,
    userId: string,
  ) {
    try {
      return await this.prismaService.watch_histroy.create({
        data: {
          ...data,
          userId,
        },
      });
    } catch (e) {
      if (e.code === 'P2003') {
        throw new BadRequestException('Invalid Id');
      } else if (e.code == 'P2002') {
        throw new BadRequestException('Already exist');
      }
      throw new Error('Error creating content genres');
    }
  }

  async getWatchHistoryById(id: string) {
    return await this.prismaService.watch_histroy.findUnique({
      where: { id },
    });
  }

  async listWatchHistoryByUser(userId: string) {
    return await this.prismaService.watch_histroy.findMany({
      where: { userId },
      orderBy: { watchedAt: 'desc' },
    });
  }

  async updateProgress(id: string, progress: number) {
    const history = await this.prismaService.watch_histroy.findUnique({
      where: { id },
    });
    if (!history) throw new NotFoundException('Watch histroy not found');

    return await this.prismaService.watch_histroy.update({
      where: { id },
      data: { progress },
    });
  }

  async deleteWatchHistory(id: string) {
    const history = await this.prismaService.watch_histroy.findUnique({
      where: { id },
    });
    if (!history) throw new NotFoundException('Watch histroy not found');
    return await this.prismaService.watch_histroy.delete({
      where: { id },
    });
  }
}
