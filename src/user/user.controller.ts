import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { RequestWithUser, UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

      @Get('profile')
      @UseGuards(JwtAuthGuard)
      getProfile(@Req() req : RequestWithUser): Promise<UserDto | null> {
       return this.userService.FindUserById(req.user.id);
      }

}
