import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";
@Injectable()
export class BcryptService {
  private readonly salt = 10;

  hash(plain: string): Promise<string> {
    return hash(plain, this.salt);
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }
}
