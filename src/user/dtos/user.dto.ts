
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
}

export enum LoginType {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export type UserDto = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  avatarUrl?: string | null;
  loginType: LoginType;
  providerId: string;
};

export type CreateUserType = Omit<UserDto, 'id'> 