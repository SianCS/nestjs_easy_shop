import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "../constants/error-code.constant";

export type ErrorResponse = {
  success: false;
  statusCode: HttpStatus;
  errorCode: ErrorCode;
  message: string;
  details?: unknown;
};

export type MessageResponse = {
  message: string;
};

export type DataResponse<T> = {
  data: T;
};

export type SuccessResponse<T> = {
  success: true;
} & Partial<MessageResponse> &
  Partial<DataResponse<T>>;
