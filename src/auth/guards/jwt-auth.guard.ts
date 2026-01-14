import { Injectable } from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredException } from "../exceptions/token-expired.exception";
import { InvalidTokenException } from "../exceptions/invalid-token.exception";
import { MissingTokenException } from "../exceptions/missing-token.exception";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err: any, user: any, info: any): any {
    if (info instanceof TokenExpiredError) throw new TokenExpiredException();
    if (info instanceof JsonWebTokenError) throw new InvalidTokenException();
    if (info instanceof Error && info.message === "No auth token")
      throw new MissingTokenException();
    if (err) {
      throw err;
    }
    return user;
  }
}
