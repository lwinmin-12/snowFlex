import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProviderDto } from './dtos/provider.dto';
import { CreateUserType, UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async FindUserByProviderId({ providerId, loginType }: ProviderDto) : Promise<UserDto | null> {
    return this.prismaService.user.findUnique({
      where: { providerId, loginType },
    }) as Promise<UserDto | null>;
  }

  async CreateUser (userData: CreateUserType): Promise<UserDto> {
    return await this.prismaService.user.create({
      data: userData,
    }) as UserDto;
  }

  async FindUserById(id: string): Promise<UserDto | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    }) as Promise<UserDto | null>;
  }
}
