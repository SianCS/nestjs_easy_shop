import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { AuthConfig } from "../schemas/auth.schema";

@Injectable()
export class AuthConfigService {
  constructor(
    private readonly configService: ConfigService<AuthConfig, true>,
  ) {}

  get confirmationEmailTtl() {
    return this.configService.get("CONFIRMATION_EMAIL_TOKEN_TTL", {
      infer: true,
    });
  }
}
