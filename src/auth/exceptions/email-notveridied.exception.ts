import { HttpStatus } from "@nestjs/common";
import {
  ERROR_CODE,
  ErrorCode,
} from "src/common/constants/error-code.constant";
import { BaseHttpException } from "src/common/exceptions/base-http.exception";

export class EmailNotVerifiedException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.UNAUTHORIZED;
  readonly errorCode: ErrorCode = ERROR_CODE.EMAIL_NOT_VERIFIED;

  constructor() {
    super("access denied. email not verified");
  }
}
