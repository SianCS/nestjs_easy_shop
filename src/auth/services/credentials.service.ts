import { Injectable } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { UsersService } from "src/users/users.service";
import { EmailVerificationTokenService } from "./email-verification-token.service";
import { AppConfigService } from "src/config/services/app-config.service";
import { FRONTEND_ROUTE } from "src/common/constants/froentend-route.constant";
import { EmailService } from "src/shared/email/email.service";
import { InvalidVerificationTokenException } from "../exceptions/invalid-verification-token.exception";
import { User } from "@prisma/client";
import { LoginDto } from "../dtos/login.dto";
import { LoginResponseDto } from "../dtos/login-response.dto";
import { InvalidCredentialsException } from "../exceptions/invalid-credentials.exception";
import { BcryptService } from "src/shared/security/services/bcrypt.service";
import { EmailNotVerifiedException } from "../exceptions/email-notveridied.exception";
import { AuthTokenService } from "src/shared/security/services/auth-token.service";
@Injectable()
export class CredentialsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailVerificationTokenService: EmailVerificationTokenService,
    private readonly appConfig: AppConfigService,
    private readonly emailService: EmailService,
    private readonly bcryptService: BcryptService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const user = await this.usersService.createByCredentials(registerDto);
    await this.sendVerificationEmail(user);
  }

  async confirmEmail(token: string): Promise<void> {
    const emailValidationToken =
      await this.emailVerificationTokenService.findByToken(token);
    if (!emailValidationToken) {
      throw new InvalidVerificationTokenException();
    }
    void this.emailVerificationTokenService.delete(emailValidationToken.userId);

    if (emailValidationToken.expiresAt < new Date()) {
      throw new InvalidVerificationTokenException();
    }

    await this.usersService.update(emailValidationToken.userId, {
      emailVerified: new Date(),
    });
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const user =
      await this.usersService.findByEmailIncludeVerificationToken(email);
    if (!user) return;
    if (user.emailVerified) return;

    if (user.emailVerificationToken) {
      void this.emailVerificationTokenService.delete(user.id);
    }
    await this.sendVerificationEmail(user);
  }

  private async sendVerificationEmail(user: User): Promise<void> {
    const token = await this.emailVerificationTokenService.create(user.id);
    const link = `${this.appConfig.frontendUrl}/${FRONTEND_ROUTE.AUTH.CONFIRM}?token=${token}`;
    this.emailService.sendConfirmationEmail(user.email, link).catch((error) => {
      console.log(error);
    });
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmailIncludeVerificationToken(
      loginDto.email,
    );
    if (!user || !user.password) {
      throw new InvalidCredentialsException();
    }

    const isMatch = await this.bcryptService.compare(
      loginDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new InvalidCredentialsException();
    }
    if (!user.emailVerified) {
      throw new EmailNotVerifiedException();
    }
    const { email, id, role } = user;
    const access_token = await this.authTokenService.sign({
      email,
      role,
      sub: id,
    });

    return { access_token };
  }
}
