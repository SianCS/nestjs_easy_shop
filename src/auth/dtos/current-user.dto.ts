import { ROLE, type Role } from "src/users/constants/role.constant";
import { EmailDto } from "./email.dto";
import { IsIn, IsUUID } from "class-validator";

export class CurrentUserDto extends EmailDto {
  @IsUUID()
  id: string;

  @IsIn(Object.values(ROLE))
  role: Role;
}
