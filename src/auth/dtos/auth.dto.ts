import { IsNotEmpty, IsString } from 'class-validator';
import e from 'express';

export class loginAuth {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  userId : string
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}