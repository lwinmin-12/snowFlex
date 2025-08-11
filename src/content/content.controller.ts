import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto } from './dto/Content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Body() createContentDto:  Omit<ContentDto, 'id'>) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  findAll(@Param() params: { page?: number, pageSize?: number }) {
    return this.contentService.findAll(params.page, params.pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto:   Omit<ContentDto, 'id'>) {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }
}
