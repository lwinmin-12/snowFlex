import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentDto } from './dto/Content.dto';
import { resContentDto } from './dto/resContent.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async create(createContentDto: Omit<ContentDto, 'id'>) {
    return await this.prisma.content.create({
      data: {
        ...createContentDto,
        releaseDate: new Date(createContentDto.releaseDate),
      },
    });
  }

  async findAll(
    page: number = 1,
    pageSize: number = 20,
  ): Promise<resContentDto> {
    const skip = (page - 1) * pageSize;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.content.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.content.count(),
    ]);

    return {
      page,
      pageSize,
      total,
      data: items,
    };
  }

  async findOne(id: string): Promise<ContentDto | null> {
    return await this.prisma.content.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateContentDto: Omit<ContentDto, 'id'>) {
    const content = await this.prisma.content.findUnique({
      where: { id },
    });
    if (!content) throw new NotFoundException('Content not found');
    return await this.prisma.content.update({
      where: { id },
      data: updateContentDto,
    });
  }

  async remove(id: string) {
     const content = await this.prisma.content.findUnique({
      where: { id },
    });
    if (!content) throw new NotFoundException('Content not found');
    return await this.prisma.content.delete({
      where: { id },
    });
  }
}
