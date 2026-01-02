import { Injectable } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { UsersService } from "src/users/users.service";
import { EmailVerificationTokenService } from "./email-verification-token.service";
import { AppConfigService } from "src/config/services/app-config.service";
import { FRONTEND_ROUTE } from "src/common/constants/froentend-route.constant";
import { EmailService } from "src/shared/email/email.service";

@Injectable()
export class CredentialsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailVerificationTokenService: EmailVerificationTokenService,
    private readonly appConfig: AppConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const user = await this.usersService.createByCredentials(registerDto);
    const token = await this.emailVerificationTokenService.create(user.id);
    const link = `${this.appConfig.frontendUrl}/${FRONTEND_ROUTE.AUTH.CONFIRM}?token=${token}`;
    this.emailService.sendConfirmationEmail(user.email, link).catch((error) => {
      console.log(error);
    });
  }
}
