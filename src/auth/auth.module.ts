import { Module } from "@nestjs/common";
import { CredentialsController } from "./controllers/credentials.controller";
import { CredentialsService } from "./services/credentials.service";

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class AuthModule {}
