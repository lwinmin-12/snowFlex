import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransitionService } from './transition.service';
import { Transition } from 'generated/prisma';
import { TransitionDto } from './dto/transition.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('transition')
export class TransitionController {
  constructor(private transitionService: TransitionService) {}

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getTransition(@Param('userId') userId: string): Promise<Transition[]> {
    return this.transitionService.getTransition(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTransition(@Body() data: TransitionDto): Promise<Transition> {
    return this.transitionService.createTransition(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateTransition(
    @Param('id') id: string,
    @Body() data: Omit<TransitionDto, 'userId'>,
  ): Promise<Transition> {
    return this.transitionService.updateTransition(id, data);
  }

  @Delete(':id')
  deleteTransition(@Param('id') id: string): Promise<void> {
    return this.transitionService.deleteTransition(id);
  }
}
