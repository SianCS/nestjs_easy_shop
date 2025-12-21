import { Module } from "@nestjs/common";
import { CredentialsController } from "./controllers/credentials.controller";
import { CredentialsService } from "./services/credentials.service";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class AuthModule {}
