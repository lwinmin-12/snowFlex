import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genres.dto';
import { ResGenresDto } from './dto/resGenres.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body('name') name: string): Promise<GenreDto | null> {
    return this.genresService.createGenre(name);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<ResGenresDto> {
    const currentPage = page ? Number(page) : 1;
    const currentPageSize = pageSize ? Number(pageSize) : 20;
    return this.genresService.listGenres(currentPage, currentPageSize);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GenreDto | null> {
    return this.genresService.getGenreById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGenreDto: Omit<GenreDto, 'id'>,
  ): Promise<GenreDto | null> {
    return this.genresService.updateGenre(id, updateGenreDto.name);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<GenreDto | null> {
    return this.genresService.deleteGenre(id);
  }
}
