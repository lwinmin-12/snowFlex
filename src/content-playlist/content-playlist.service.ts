import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentPlaylistDto } from './dto/content-playlist.dto';

@Injectable()
export class ContentPlaylistService {
  constructor(private readonly prismaService: PrismaService) {}

  async createContentPlaylist(data: Omit<ContentPlaylistDto, 'id'>) {
    return await this.prismaService.content_playlist.create({
      data,
    });
  }

  async getContentPlaylistById(id: string) {
    return await this.prismaService.content_playlist.findUnique({
      where: { id },
      include: { play_list: true, content: true },
    });
  }

  async listContentPlaylistsByPlayList(playListId: string) {
    return await this.prismaService.content_playlist.findMany({
      where: { playListId },
      orderBy: { sequence: 'asc' },
      include: { content: true },
    });
  }

  async updateContentPlaylist(
    id: string,
    data: Partial<Omit<ContentPlaylistDto, 'id'>>
  ) {
    return await this.prismaService.content_playlist.update({
      where: { id },
      data,
    });
  }

  async deleteContentPlaylist(id: string) {
    return await this.prismaService.content_playlist.delete({
      where: { id },
    });
  }
}
