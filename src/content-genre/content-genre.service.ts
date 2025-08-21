import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentGenreService {
  constructor(private prismaService: PrismaService) {}
  async addGenreToContent(contentId: string, genreId: string) {
    try {
      return await this.prismaService.content_genres.create({
        data: {
          contentId,
          genreId,
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

  // Remove a genre from a content (movie)
  async removeGenreFromContent(contentId: string, genreId: string) {
    try {
      return await this.prismaService.content_genres.delete({
        where: {
          contentId_genreId: {
            contentId,
            genreId,
          },
        },
      });
    } catch (e) {
      if (e.code == 'P2025') {
        throw new NotFoundException('No data with that Id');
      }
      throw new Error('Error Deleting content genres');
    }
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
