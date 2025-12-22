import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { validate } from "./schemas/env.schema";
import { JwtConfigService } from "./services/jwt-config.service";
import { AuthConfigService } from "./services/auth-config.service";
import { AppConfigService } from "./services/app-config.service";

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [JwtConfigService, AuthConfigService, AppConfigService],
  exports: [JwtConfigService, AuthConfigService, AppConfigService],
})
export class ConfigModule {}
