import { Module } from '@nestjs/common';
import { ContentGenreService } from './content-genre.service';
import { ContentGenreController } from './content-genre.controller';

@Module({
  controllers: [ContentGenreController],
  providers: [ContentGenreService],
})
export class ContentGenreModule {}
