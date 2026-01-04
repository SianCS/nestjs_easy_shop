import { HttpStatus } from "@nestjs/common";
import {
  ERROR_CODE,
  ErrorCode,
} from "src/common/constants/error-code.constant";
import { BaseHttpException } from "src/common/exceptions/base-http.exception";

export class InvalidVerificationTokenException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
  readonly errorCode: ErrorCode = ERROR_CODE.INVALID_VERIFICATION_TOKEN;

  constructor() {
    super("Invalid verification token or expired");
  }
}
