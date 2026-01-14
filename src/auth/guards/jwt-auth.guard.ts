import { ExecutionContext, Injectable } from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredException } from "../exceptions/token-expired.exception";
import { InvalidTokenException } from "../exceptions/invalid-token.exception";
import { MissingTokenException } from "../exceptions/missing-token.exception";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    return super.canActivate(context);
  }
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
