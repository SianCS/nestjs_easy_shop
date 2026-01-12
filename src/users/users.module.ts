import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SecurityModule } from "src/shared/security/security.module";
import { ProviderAccountService } from "./services/provider-account.service";

@Module({
  imports: [SecurityModule],
  providers: [UsersService, ProviderAccountService],
  exports: [UsersService, ProviderAccountService],
})
export class UsersModule {}
