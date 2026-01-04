import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
