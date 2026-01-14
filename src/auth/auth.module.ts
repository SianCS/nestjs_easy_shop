import { Module } from "@nestjs/common";
import { CredentialsController } from "./controllers/credentials.controller";
import { CredentialsService } from "./services/credentials.service";
import { UsersModule } from "src/users/users.module";
import { SecurityModule } from "src/shared/security/security.module";
import { EmailVerificationTokenService } from "./services/email-verification-token.service";
import { EmailModule } from "src/shared/email/email.module";
import { GoogleController } from "./controllers/google.controller";
import { GoogleStrategy } from "./strategies/google.strategy";
import { GoogleUserValidator } from "./validators/google-user.validator";
import { GoogleService } from "./services/google.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [UsersModule, SecurityModule, EmailModule],
  controllers: [CredentialsController, GoogleController],
  providers: [
    CredentialsService,
    EmailVerificationTokenService,
    GoogleStrategy,
    GoogleUserValidator,
    GoogleService,
    JwtStrategy,
  ],
})
export class AuthModule {}
