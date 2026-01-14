import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { CredentialsService } from "../services/credentials.service";
import { DataResponse, MessageResponse } from "src/common/types/response.type";
import { ConfirmEmailDto } from "../dtos/confirm-email.dto";
import { EmailDto } from "../dtos/email.dto";
import { LoginDto } from "../dtos/login.dto";
import { LoginResponseDto } from "../dtos/login-response.dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { Public } from "../decorators/public.decorator";
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
    @Body() emailDto: EmailDto,
  ): Promise<MessageResponse> {
    await this.credentialsService.resendVerificationEmail(emailDto.email);
    return { message: "Verification email resent successfully" };
  }

  @ApiOkResponse({ type: LoginResponseDto })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<DataResponse<LoginResponseDto>> {
    const data = await this.credentialsService.login(loginDto);
    return { data };
  }
}
