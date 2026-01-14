import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfigService } from "src/config/services/jwt-config.service";
import { AccessJwtPayload } from "../types/payload.type";
import { CurrentUserDto } from "../dtos/current-user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtConfig: JwtConfigService) {
    super({
      secretOrKey: jwtConfig.accessJwtSecret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  validate(payload: AccessJwtPayload): CurrentUserDto {
    const { sub, email, role } = payload;
    return { id: sub, email, role };
  }
}
