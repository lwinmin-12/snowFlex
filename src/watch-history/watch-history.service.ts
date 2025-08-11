import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WatchHistoryDto } from './dto/watch-history.dto';

@Injectable()
export class WatchHistoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async createWatchHistory(data: Omit<WatchHistoryDto, 'id'>) {
    return await this.prismaService.watch_histroy.create({
      data,
    });
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
    return await this.prismaService.watch_histroy.update({
      where: { id },
      data: { progress },
    });
  }

  async deleteWatchHistory(id: string) {
    return await this.prismaService.watch_histroy.delete({
      where: { id },
    });
  }
}
