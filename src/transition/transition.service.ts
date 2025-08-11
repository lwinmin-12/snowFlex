import { BadRequestException, Injectable } from '@nestjs/common';
import { Transition } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { TransitionDto } from './dto/transition.dto';

@Injectable()
export class TransitionService {
  constructor(private prismaService: PrismaService) {}

  async createTransition(data: TransitionDto): Promise<Transition> {
    try {
      return await this.prismaService.transition.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Invalid userId — user does not exist');
      }
      throw new Error('Error creating transition');
    }
  }

  async getTransition(userId: string): Promise<Transition[]> {
    const transition = await this.prismaService.transition.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
    return transition;
  }

  async updateTransition(
    id: string,
    data: Omit<TransitionDto, 'userId'>,
  ): Promise<Transition> {
    try {
      const transition = await this.prismaService.transition.update({
        where: { id },
        data,
      });
      return transition;
    } catch (error) {
      throw new Error('Error updating transition');
    }
  }

  async deleteTransition(id: string): Promise<void> {
    await this.prismaService.transition.delete({
      where: { id },
    });
  }
}
