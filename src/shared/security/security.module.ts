import { Module } from "@nestjs/common";
import { BcryptService } from "./services/bcrypt.service";
import { CryptoService } from "./services/crypto.service";
import { AuthTokenService } from "./services/auth-token.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtModuleOptions } from "./config/jwt.config";

@Module({
  imports: [JwtModule.registerAsync(jwtModuleOptions)],
  providers: [BcryptService, CryptoService, AuthTokenService],
  exports: [BcryptService, CryptoService, AuthTokenService],
})
export class SecurityModule {}
