import { Injectable } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CredentialsService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const user = await this.usersService.createByCredentials(registerDto);
  }
}
