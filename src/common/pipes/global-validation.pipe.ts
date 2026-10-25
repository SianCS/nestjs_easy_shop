import { ValidationError, ValidationPipe } from "@nestjs/common";
import { ValidationException } from "../exceptions/validation.exception";

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const details: Record<string, string[]> = {};
        errors.forEach((error) => {
          details[error.property] = Object.values(error.constraints ?? {});
        });
        throw new ValidationException(details);
      },
    });
  }
}
