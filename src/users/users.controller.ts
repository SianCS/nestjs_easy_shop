import { Controller, Patch } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Patch()
  update() {}
}
