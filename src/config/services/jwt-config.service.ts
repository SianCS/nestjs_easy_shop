import { Injectable } from "@nestjs/common";
import { JwtConfig } from "../schemas/jwt.schema";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService<JwtConfig, true>) {}

  get accessJwtSecret() {
    return this.configService.get("ACCESS_JWT_SECRET", { infer: true });
  }

  get accessJwtTtl() {
    return this.configService.get("ACCESS_JWT_TTL", {
      infer: true,
    });
  }
}
