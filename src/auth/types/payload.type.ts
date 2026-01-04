import { Role } from "src/users/constants/role.constant";

export type AccessJwtPayload = {
  sub: string;
  email: string;
  role: Role;
};
