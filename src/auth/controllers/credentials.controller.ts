import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { CredentialsService } from "../services/credentials.service";
import { MessageResponse } from "src/common/types/response.type";
import { ConfirmEmailDto } from "../dtos/confirm-email.dto";
import { ResendVerificationEmailDto } from "../dtos/resend-verification-email.dto";

@Controller("auth")
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<MessageResponse> {
    await this.credentialsService.register(registerDto);
    return { message: "User registered successfully" };
  }

  @HttpCode(HttpStatus.OK)
  @Post("confirm")
  async confirmEmail(
    @Body() confirmEmailDto: ConfirmEmailDto,
  ): Promise<MessageResponse> {
    await this.credentialsService.confirmEmail(confirmEmailDto.token);
    return { message: "Email verified successfully" };
  }

  @HttpCode(HttpStatus.OK)
  @Post("resend")
  async resendVerificationEmail(
    @Body() resendVerificationEmailDto: ResendVerificationEmailDto,
  ): Promise<MessageResponse> {
    await this.credentialsService.resendVerificationEmail(
      resendVerificationEmailDto.email,
    );
    return { message: "Verification email resent successfully" };
  }
}
