import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ContentPlaylistService } from './content-playlist.service';
import { ContentPlaylistDto } from './dto/content-playlist.dto';

@Controller('content-playlist')
export class ContentPlaylistController {
  constructor(private readonly contentPlaylistService: ContentPlaylistService) {}

  @Post()
  async create(@Body() data: Omit<ContentPlaylistDto, 'id'>) {
    return this.contentPlaylistService.createContentPlaylist(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contentPlaylistService.getContentPlaylistById(id);
  }

  @Get('playlist/:playListId')
  async findByPlayList(@Param('playListId') playListId: string) {
    return this.contentPlaylistService.listContentPlaylistsByPlayList(playListId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<ContentPlaylistDto, 'id'>>,
  ) {
    return this.contentPlaylistService.updateContentPlaylist(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contentPlaylistService.deleteContentPlaylist(id);
  }
}
