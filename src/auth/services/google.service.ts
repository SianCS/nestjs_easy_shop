import { Injectable } from "@nestjs/common";
import { LoginResponseDto } from "../dtos/login-response.dto";
import { GoogleUserDto } from "../dtos/google-user.dto";
import { UsersService } from "src/users/users.service";
import {
  PROVIDER,
  PROVIDER_TYPE,
} from "src/common/constants/provider-account.constant";
import { User } from "@prisma/client";
import { AuthTokenService } from "src/shared/security/services/auth-token.service";
import { AccessJwtPayload } from "../types/payload.type";
import { ProviderAccountService } from "src/users/services/provider-account.service";

@Injectable()
export class GoogleService {
  constructor(
    private readonly userService: UsersService,
    private readonly authTokenService: AuthTokenService,
    private readonly providerAccountService: ProviderAccountService,
  ) {}
  async login(googleUserDto: GoogleUserDto): Promise<LoginResponseDto> {
    const { email, providerId } = googleUserDto;
    const user = await this.userService.findByEmailIncludeProviderAccount(
      email,
      PROVIDER.GOOGLE,
    );

    if (!user) {
      const userWithProviderAccount = await this.userService.createBygoogle(
        email,
        providerId,
      );
      const access_token = await this.generateAccessToken(
        userWithProviderAccount,
      );
      return { access_token };
    }

    if (user.providerAccounts.length === 0) {
      await this.providerAccountService.create({
        userId: user.id,
        type: PROVIDER_TYPE.OAUTH,
        provider: PROVIDER.GOOGLE,
        providerId,
      });
    }
    const access_token = await this.generateAccessToken(user);
    return { access_token };
  }

  private generateAccessToken(user: User): Promise<string> {
    const { id, email, role } = user;
    const payload: AccessJwtPayload = { sub: id, email, role };
    return this.authTokenService.sign(payload);
  }
}
