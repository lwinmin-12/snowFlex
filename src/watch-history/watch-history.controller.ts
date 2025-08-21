import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';
import { WatchHistoryDto } from './dto/watch-history.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RequestWithUser } from 'src/user/dtos/user.dto';

@Controller('watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req : RequestWithUser ,@Body() createWatchHistoryDto: Omit<WatchHistoryDto, 'id'>) {
    return this.watchHistoryService.createWatchHistory(createWatchHistoryDto , req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findByUserId(@Req() req : RequestWithUser ) {
    return this.watchHistoryService.listWatchHistoryByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id' , ParseUUIDPipe) id: string) {
    return this.watchHistoryService.getWatchHistoryById(id);
  }

  @Patch(':id')
  update(@Param('id' , ParseUUIDPipe) id: string, @Body('progress') progress: number) {
    return this.watchHistoryService.updateProgress(id, progress);
  }

  @Delete(':id')
  remove(@Param('id' , ParseUUIDPipe) id: string) {
    return this.watchHistoryService.deleteWatchHistory(id);
  }
}
