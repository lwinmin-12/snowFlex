import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';
import { WatchHistoryDto } from './dto/watch-history.dto';

@Controller('watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Post()
  create(@Body() createWatchHistoryDto: Omit<WatchHistoryDto, 'id'>) {
    return this.watchHistoryService.createWatchHistory(createWatchHistoryDto);
  }

  @Get()
  findByUserId(@Param('userId') userId: string) {
    return this.watchHistoryService.listWatchHistoryByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchHistoryService.getWatchHistoryById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('progress') progress: number) {
    return this.watchHistoryService.updateProgress(id, progress);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchHistoryService.deleteWatchHistory(id);
  }
}
