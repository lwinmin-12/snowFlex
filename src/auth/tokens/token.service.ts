import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { Token } from './token.dto';

@Injectable()
export class TokensService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createRefreshToken(userId, email): Promise<string> {
    const token = this.jwtService.sign(
      { userId: userId, email },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
      },
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prismaService.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  async findToken(token: string, userId: string) {
    return this.prismaService.refreshToken.findFirst({
      where: { token, userId },
      include: { user: true },
    });
  }

  async deleteToken(token: string): Promise<void> {
    await this.prismaService.refreshToken.delete({
      where: { token },
    });
  }

  async deleteAllTokensForUser(userId: string): Promise<void> {
    await this.prismaService.refreshToken.deleteMany({ where: { userId } });
  }
}
