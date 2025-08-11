import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentGenreService {
  constructor(private prismaService: PrismaService) {}
  async addGenreToContent(contentId: string, genreId: string) {
    return await this.prismaService.content_genres.create({
      data: {
        contentId,
        genreId,
      },
    });
  }

  // Remove a genre from a content (movie)
  async removeGenreFromContent(contentId: string, genreId: string) {
    return await this.prismaService.content_genres.delete({
      where: {
        contentId_genreId: {
          contentId,
          genreId,
        },
      },
    });
  }

  // List genres for a movie
  async getGenresForContent(contentId: string) {
    return await this.prismaService.content_genres.findMany({
      where: { contentId },
      include: { genre: true }, // Include genre details
    });
  }

  async getContentsForGenre(genreId: string) {
    return await this.prismaService.content_genres.findMany({
      where: { genreId },
      include: { content: true },
    });
  }
}
