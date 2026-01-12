import { HttpStatus } from "@nestjs/common";
import {
  ERROR_CODE,
  ErrorCode,
} from "src/common/constants/error-code.constant";
import { BaseHttpException } from "src/common/exceptions/base-http.exception";

export class InvalidGoogleProfileException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.UNAUTHORIZED;
  readonly errorCode: ErrorCode = ERROR_CODE.INVALID_GOOGLE_PROFILE;

  constructor() {
    super("Invalid Google profile");
  }
}
