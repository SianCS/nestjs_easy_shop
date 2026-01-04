import {
  IsAlphanumeric,
  // IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { EmailDto } from "./email.dto";

export class RegisterDto extends EmailDto {
  // @IsString()
  // @IsNotEmpty()
  // @IsEmail()
  // email: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6)
  password: string;
}
