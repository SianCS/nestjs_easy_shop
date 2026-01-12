import {
  Controller,
  Get,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GoogleUserDto } from "../dtos/google-user.dto";
import { GoogleUser } from "../decorators/google-user.decorator";
import type { Response } from "express";
import { GoogleService } from "../services/google.service";
import { AppConfigService } from "src/config/services/app-config.service";

@Controller("auth/google")
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly appConfig: AppConfigService,
  ) {}
  @UseGuards(AuthGuard("google"))
  @Get()
  googleConsent() {}

  @UseGuards(AuthGuard("google"))
  @Get("callback")
  async googleRedirect(
    @GoogleUser(new ValidationPipe({ validateCustomDecorators: true }))
    googleUserDto: GoogleUserDto,
    @Res() response: Response,
  ) {
    const result = await this.googleService.login(googleUserDto);
    response.cookie("access_token", result.access_token);
    response.redirect(this.appConfig.frontendUrl);
  }
}
