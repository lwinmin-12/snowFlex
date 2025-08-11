import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentDto } from './dto/Content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(createContentDto: Omit<ContentDto , 'id'>) {
    return this.prisma.content.create({
      data: createContentDto,
    });
  }

 findAll(page: number = 1, pageSize: number = 50): Promise<ContentDto[]> {
    const skip = (page - 1) * pageSize;
    return this.prisma.content.findMany({
      skip,
      take: pageSize,
    })
  }

  findOne(id: string): Promise<ContentDto | null> {
    return this.prisma.content.findUnique({
      where: { id },
    });
  }

  update(id: string, updateContentDto: Omit<ContentDto , 'id'>) {
    return this.prisma.content.update({
      where: { id },
      data: updateContentDto,
    });
  }

  remove(id: string) {
    return this.prisma.content.delete({
      where: { id },
    });
  }
}
