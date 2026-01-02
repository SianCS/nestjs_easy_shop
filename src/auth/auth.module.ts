import { Module } from "@nestjs/common";
import { CredentialsController } from "./controllers/credentials.controller";
import { CredentialsService } from "./services/credentials.service";
import { UsersModule } from "src/users/users.module";
import { SecurityModule } from "src/shared/security/security.module";
import { EmailVerificationTokenService } from "./services/email-verification-token.service";
import { EmailModule } from "src/shared/email/email.module";

@Module({
  imports: [UsersModule, SecurityModule, EmailModule],
  controllers: [CredentialsController],
  providers: [CredentialsService, EmailVerificationTokenService],
})
export class AuthModule {}
