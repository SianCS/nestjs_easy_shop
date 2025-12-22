import { Module } from "@nestjs/common";
import { CredentialsController } from "./controllers/credentials.controller";
import { CredentialsService } from "./services/credentials.service";
import { UsersModule } from "src/users/users.module";
import { SecurityModule } from "src/shared/security/security.module";
import { EmailVerificationTokenService } from "./services/email-verification-token.service";

@Module({
  imports: [UsersModule, SecurityModule],
  controllers: [CredentialsController],
  providers: [CredentialsService, EmailVerificationTokenService],
})
export class AuthModule {}
