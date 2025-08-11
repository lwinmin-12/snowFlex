import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body('name') name: string): Promise<GenreDto | null> {
    return this.genresService.createGenre(name);
  }

  @Get()
  findAll(): Promise<GenreDto[]> {
    return this.genresService.listGenres();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GenreDto | null> {
    return this.genresService.getGenreById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: Omit<GenreDto, 'id'>): Promise<GenreDto | null> {
    return this.genresService.updateGenre(id, updateGenreDto.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<GenreDto | null> {
    return this.genresService.deleteGenre(id);
  }
}
