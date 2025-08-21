import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ContentGenreService } from './content-genre.service';
import { ContentGenreDto } from './dto/content-genre.dto';

@Controller('content-genre')
export class ContentGenreController {
  constructor(private readonly contentGenreService: ContentGenreService) {}

  @Post()
  create(@Body() createContentGenreDto: Omit<ContentGenreDto, 'id'>) {
    return this.contentGenreService.addGenreToContent(
      createContentGenreDto.contentId,
      createContentGenreDto.genreId,
    );
  }

  @Get('content/:contentId/genres')
  findGenreForContent(@Param('contentId' , ParseUUIDPipe) contentId: string) {
    return this.contentGenreService.getGenresForContent(contentId);
  }

  @Get('genre/:genreId/contents')
  findContentForGenre(@Param('genreId' , ParseUUIDPipe) genreId: string) {
    return this.contentGenreService.getContentsForGenre(genreId);
  }

  @Delete('content/:contentId/genre/:genreId')
  remove(
    @Param('contentId' , ParseUUIDPipe) contentId: string,
    @Param('genreId' , ParseUUIDPipe) genreId: string,
  ) {
    return this.contentGenreService.removeGenreFromContent(contentId, genreId);
  }
  
}
