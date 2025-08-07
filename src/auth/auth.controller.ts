import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuth, RefreshTokenDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('google')
  async googleLogin(@Body() dto: loginAuth) {
    return this.authService.handleGoogleLogin(dto.accessToken);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('facebook')
  async facebookLogin(@Body() dto: loginAuth) {
    return this.authService.handleFacebookLogin(dto.accessToken);
  }
    @HttpCode(HttpStatus.CREATED)
    @Post('refresh')
    async refreshAccessToken(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshTokens(dto.refreshToken, dto.userId);
    }
}
