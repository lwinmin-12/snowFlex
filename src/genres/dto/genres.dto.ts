import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GenreDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
