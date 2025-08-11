import { Module } from '@nestjs/common';
import { TransitionService } from './transition.service';
import { TransitionController } from './transition.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TransitionController],
  providers: [TransitionService, PrismaService],
})
export class TransitionModule {}
