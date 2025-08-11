import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/user/dtos/user.dto';

export class TransitionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  expireDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}



export type Transition = TransitionDto & {
  id: string;
  createdAt: Date;
  user: UserDto;
};
