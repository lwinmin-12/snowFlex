import { UserDto } from "src/user/dtos/user.dto";

export type Token = {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  user : UserDto
};