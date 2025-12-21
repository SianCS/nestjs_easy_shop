import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { CredentialsService } from "../services/credentials.service";
import { MessageResponse } from "src/common/types/response.type";

@Controller("auth")
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<MessageResponse> {
    await this.credentialsService.register(registerDto);
    return { message: "User registered successfully" };
  }
}
