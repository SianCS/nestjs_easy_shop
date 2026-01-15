import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { validate } from "./schemas/env.schema";
import { JwtConfigService } from "./services/jwt-config.service";
import { AuthConfigService } from "./services/auth-config.service";
import { AppConfigService } from "./services/app-config.service";
import { MailerConfigService } from "./services/mailer-config.service";
import { GoogleConfigService } from "./services/google-config.service";
import { CloudinaryConfigService } from "./services/cloudinary-config.service";

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [
    JwtConfigService,
    AuthConfigService,
    AppConfigService,
    MailerConfigService,
    GoogleConfigService,
    CloudinaryConfigService,
  ],
  exports: [
    JwtConfigService,
    AuthConfigService,
    AppConfigService,
    MailerConfigService,
    GoogleConfigService,
  ],
})
export class ConfigModule {}
