import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { playListDto } from './dto/playlist.dto';

@Injectable()
export class PlayListService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPlayList(data: Omit<playListDto, 'id'>) {
    return await this.prismaService.play_list.create({
      data,
    });
  }

  async getPlayListById(id: string) {
    return await this.prismaService.play_list.findUnique({
      where: { id },
    });
  }

  async listPlayLists() {
    return await this.prismaService.play_list.findMany({
      orderBy: { sequence: 'asc' },
    });
  }

  async updatePlayList(id: string, data: Partial<Omit<playListDto, 'id'>>) {
    return await this.prismaService.play_list.update({
      where: { id },
      data,
    });
  }

  async deletePlayList(id: string) {
    return await this.prismaService.play_list.delete({
      where: { id },
    });
  }
}
