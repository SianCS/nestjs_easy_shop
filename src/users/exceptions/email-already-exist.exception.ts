import { HttpStatus } from "@nestjs/common";
import {
  ErrorCode,
  ERROR_CODE,
} from "src/common/constants/error-code.constant";
import { BaseHttpException } from "src/common/exceptions/base-http.exception";

export class EmailAlreadyExistException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.CONFLICT;
  readonly errorCode: ErrorCode = ERROR_CODE.EMAIL_ALREADY_EXISTS;

  constructor() {
    super("Email already exists");
  }
}
