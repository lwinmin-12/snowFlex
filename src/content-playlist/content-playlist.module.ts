import { Module } from '@nestjs/common';
import { ContentPlaylistService } from './content-playlist.service';
import { ContentPlaylistController } from './content-playlist.controller';

@Module({
  controllers: [ContentPlaylistController],
  providers: [ContentPlaylistService],
})
export class ContentPlaylistModule {}
