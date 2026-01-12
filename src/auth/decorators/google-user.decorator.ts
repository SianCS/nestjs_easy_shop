import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const GoogleUser = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
