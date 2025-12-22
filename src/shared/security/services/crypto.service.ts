import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";

@Injectable()
export class CryptoService {
  randomString(size: number = 32): string {
    return randomBytes(size).toString("hex");
  }
}
