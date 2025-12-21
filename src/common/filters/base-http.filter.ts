import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { BaseHttpException } from "../exceptions/base-http.exception";
import { Response } from "express";
import { ErrorResponse } from "../types/response.type";

@Catch(BaseHttpException)
export class BaseHttpFilter implements ExceptionFilter {
  catch(exception: BaseHttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { statusCode, message, errorCode, details } = exception;
    const responseBody: ErrorResponse = {
      success: false,
      statusCode,
      message,
      errorCode,
      details,
    };
    response.status(statusCode).json(responseBody);
  }
}
