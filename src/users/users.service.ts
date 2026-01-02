import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { RegisterDto } from "src/auth/dtos/register.dto";
import {
  PROVIDER,
  PROVIDER_TYPE,
} from "src/common/constants/provider-account.constant";
import { PRISMA_ERROR_CODE } from "src/database/constants/prisma-error-code";
import { PrismaService } from "src/database/prisma.service";
import { BcryptService } from "src/shared/security/services/bcrypt.service";
import { EmailAlreadyExistException } from "./exceptions/email-already-exist.exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

@Injectable()
export class UsersService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly prisma: PrismaService,
  ) {}

  async createByCredentials(registerDto: RegisterDto): Promise<User> {
    registerDto.password = await this.bcryptService.hash(registerDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...registerDto,
          providerAccounts: {
            create: {
              type: PROVIDER_TYPE.CREDENTIALS,
              provider: PROVIDER.CREDENTIALS,
              providerId: registerDto.email,
            },
          },
        },
      });
      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR_CODE.UNIQUE_CONSTRAINT_FAILED
      ) {
        throw new EmailAlreadyExistException();
      }
      throw error;
    }
  }
}
