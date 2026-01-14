import { HttpStatus } from "@nestjs/common";
import {
  ERROR_CODE,
  ErrorCode,
} from "src/common/constants/error-code.constant";
import { BaseHttpException } from "src/common/exceptions/base-http.exception";

export class TokenExpiredException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.UNAUTHORIZED;
  readonly errorCode: ErrorCode = ERROR_CODE.TOKEN_EXPIRED;

  constructor() {
    super("Token has expired");
  }
}
