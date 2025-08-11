import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class GenresService {
  constructor(private prismaService: PrismaService) {}
  async createGenre(name: string) : Promise<GenreDto> {
    return await this.prismaService.genres.create({
      data: { name },
    });
  }

  async getGenreById(id: string): Promise<GenreDto | null>{
    return await this.prismaService.genres.findUnique({
      where: { id },
    });
  }

  async listGenres(): Promise<GenreDto[]> {
    return await this.prismaService.genres.findMany();
  }

  async updateGenre(id: string, name: string): Promise<GenreDto> {
    return await this.prismaService.genres.update({
      where: { id },
      data: { name },
    });
  }

  async deleteGenre(id: string) {
    return await this.prismaService.genres.delete({
      where: { id },
    });
  }
}
