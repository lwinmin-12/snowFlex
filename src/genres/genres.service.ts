import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenreDto } from './dto/genres.dto';
import { ResGenresDto } from './dto/resGenres.dto';

@Injectable()
export class GenresService {
  constructor(private prismaService: PrismaService) {}
  async createGenre(name: string): Promise<GenreDto> {
    return await this.prismaService.genres.create({
      data: { name },
    });
  }

  async getGenreById(id: string): Promise<GenreDto | null> {
    return await this.prismaService.genres.findUnique({
      where: { id },
    });
  }

  async listGenres(
    page: number = 1,
    pageSize: number = 20,
  ): Promise<ResGenresDto> {
    const skip = (page - 1) * pageSize;

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.genres.findMany({
        skip,
        take: pageSize,
      }),
      this.prismaService.genres.count(),
    ]);

    return {
      page,
      pageSize,
      total,
      data: items,
    };
  }

  async updateGenre(id: string, name: string): Promise<GenreDto> {
    const genre = await this.prismaService.genres.findUnique({
      where: { id },
    });

    if (!genre) throw new NotFoundException('Genre not found');
    return await this.prismaService.genres.update({
      where: { id },
      data: { name },
    });
  }

  async deleteGenre(id: string) {
    const genre = await this.prismaService.genres.findUnique({
      where: { id },
    });

    if (!genre) throw new NotFoundException('Genre not found');
    return await this.prismaService.genres.delete({
      where: { id },
    });
  }
}
