import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SecurityModule } from "src/shared/security/security.module";
import { ProviderAccountService } from "./services/provider-account.service";
import { UsersController } from "./users.controller";

@Module({
  imports: [SecurityModule],
  providers: [UsersService, ProviderAccountService],
  exports: [UsersService, ProviderAccountService],
  controllers: [UsersController],
})
export class UsersModule {}
