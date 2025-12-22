import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerConfig } from "../schemas/mailer.schema";

@Injectable()
export class MailerConfigService {
  constructor(
    private readonly configService: ConfigService<MailerConfig, true>,
  ) {}

  get host() {
    return this.configService.get("SMTP_HOST", { infer: true });
  }

  get port() {
    return this.configService.get("SMTP_PORT", { infer: true });
  }

  get user() {
    return this.configService.get("SMTP_USER", { infer: true });
  }

  get password() {
    return this.configService.get("SMTP_PASSWORD", { infer: true });
  }
}
