import { Module } from "@nestjs/common";
import { BcryptService } from "./services/bcrypt.service";
import { CryptoService } from "./services/crypto.service";

@Module({
  providers: [BcryptService, CryptoService],
  exports: [BcryptService, CryptoService],
})
export class SecurityModule {}
