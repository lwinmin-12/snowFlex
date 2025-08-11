import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PlayListService } from './playlist.service';
import { playListDto } from './dto/playlist.dto';

@Controller('play-lists')
export class PlayListController {
  constructor(private readonly playListService: PlayListService) {}

  @Post()
  async create(@Body() data: Omit<playListDto, 'id'>) {
    return this.playListService.createPlayList(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playListService.getPlayListById(id);
  }

  @Get()
  async findAll() {
    return this.playListService.listPlayLists();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<playListDto, 'id'>>,
  ) {
    return this.playListService.updatePlayList(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.playListService.deletePlayList(id);
  }
}
