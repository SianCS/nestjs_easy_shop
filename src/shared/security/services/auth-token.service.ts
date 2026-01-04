import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { AccessJwtPayload } from "src/auth/types/payload.type";

@Injectable()
export class AuthTokenService {
  constructor(private jwtService: JwtService) {}

  sign(payload: AccessJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
