import { Injectable } from "@nestjs/common";
import { EmailVerificationToken } from "@prisma/client";
import { AuthConfigService } from "src/config/services/auth-config.service";
import { PrismaService } from "src/database/prisma.service";
import { CryptoService } from "src/shared/security/services/crypto.service";

@Injectable()
export class EmailVerificationTokenService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly prisma: PrismaService,
    private readonly authConfig: AuthConfigService,
  ) {}

  async create(userId: string): Promise<string> {
    const token = this.cryptoService.randomString();
    await this.prisma.emailVerificationToken.create({
      data: {
        userId,
        token,
        expiresAt: new Date(
          Date.now() + this.authConfig.confirmationEmailTtl * 1000,
        ),
      },
    });
    return token;
  }

  findByToken(token: string): Promise<EmailVerificationToken | null> {
    return this.prisma.emailVerificationToken.findUnique({
      where: { token },
    });
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.emailVerificationToken.deleteMany({
      where: { userId },
    });
  }
}
