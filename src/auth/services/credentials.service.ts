import { Injectable } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";

@Injectable()
export class CredentialsService {
  async register(registerDto: RegisterDto): Promise<void> {}
}
