import { LoginType } from "generated/prisma";

export class ProviderDto {
    providerId: string;
    loginType: LoginType;
}