import { IsNotEmpty, IsString } from 'class-validator';

export class ContentGenreDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  contentId: string;

  @IsString()
  @IsNotEmpty()
  genreId: string;
}
