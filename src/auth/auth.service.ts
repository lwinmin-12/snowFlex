import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserStatus, LoginType } from 'src/user/dtos/user.dto';
import { RefreshTokenDto } from './dtos/auth.dto';
import { TokensService } from './tokens/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokensService: TokensService, // Assuming TokensService is imported correctly
  ) {}

  async handleGoogleLogin(access_token: string) {
    try {
      const profileRes = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );
      const profile = profileRes.data;

      let user = await this.userService.FindUserByProviderId({
        providerId: profile.sub,
        loginType: LoginType.GOOGLE,
      });

      if (!user) {
        user = await this.userService.CreateUser({
          name: profile.name,
          email: profile.email,
          status: UserStatus.ACTIVE,
          avatarUrl: profile.picture || null,
          loginType: LoginType.GOOGLE,
          providerId: profile.sub,
        });
      }

      const token = this.generateTokens(user.id, user.email);
      return {
        ...token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
      };
    } catch (error) {
      if (error.response?.status === 403) {
        throw new ForbiddenException('Unauthored access');
      }
      throw new BadRequestException('Something bad happened');
    }
  }

  async handleFacebookLogin(access_token: string) {
    try {
      const profileRes = await axios.get('https://graph.facebook.com/me', {
        params: {
          fields: 'id,name,email,picture.width(512).height(512)',
          access_token,
        },
      });

      const profile = profileRes.data;
      let user = await this.userService.FindUserByProviderId({
        providerId: profile.id,
        loginType: LoginType.FACEBOOK,
      });
      if (!user) {
        user = await this.userService.CreateUser({
          name: profile.name,
          email: profile.email,
          status: UserStatus.ACTIVE,
          avatarUrl: profile.picture?.data?.url || null,
          loginType: LoginType.FACEBOOK,
          providerId: profile.id,
        });
      }
      const token = await this.generateTokens(user.id, user.email);
      return {
        ...token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
      };
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403) {
        throw new ForbiddenException('Unauthored access');
      }
      throw new BadRequestException('Something bad happened');
    }
  }

  // auth.service.ts
  async refreshTokens(refreshToken: string, userId: string) {

    const tokenData = await this.tokensService.findToken(refreshToken, userId);
    if (!tokenData || new Date() > tokenData.expiresAt) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    } 

    try {
      this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });
    } catch (err) {
      await this.tokensService.deleteToken(refreshToken);
      throw new UnauthorizedException('Invalid refresh token');
    }
    await this.tokensService.deleteToken(refreshToken);

    const token = await this.generateTokens(tokenData.userId, tokenData.user.email);
    return {
      ...token,
      user: {
        id: tokenData.user.id,
        email: tokenData.user.email,
        name: tokenData.user.name,
        avatarUrl: tokenData.user.avatarUrl,
      },
    };
  }

  async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = await this.tokensService.createRefreshToken(
      userId,
      email,
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
