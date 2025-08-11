import { Module } from '@nestjs/common';
import { PlayListController } from './playlist.controller';
import { PlayListService } from './playlist.service';

@Module({
  controllers: [PlayListController],
  providers: [PlayListService],
})
export class PlaylistModule {}
