import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class GoogleUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  providerId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
