import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GoogleUserDto } from "../dtos/google-user.dto";
import { validate } from "class-validator";
import { InvalidGoogleProfileException } from "../exceptions/invalid-google-profile.exctption";

@Injectable()
export class GoogleUserValidator {
  async validate(input: unknown): Promise<GoogleUserDto> {
    const googleUserDto = plainToInstance(GoogleUserDto, input, {
      excludeExtraneousValues: true,
    });

    const errors = await validate(googleUserDto);
    if (errors.length > 0) {
      throw new InvalidGoogleProfileException();
    }

    return googleUserDto;
  }
}
