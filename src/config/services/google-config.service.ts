import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleConfig } from "../schemas/google.schema";

@Injectable()
export class GoogleConfigService {
  constructor(
    private readonly configService: ConfigService<GoogleConfig, true>,
  ) {}

  get googleClientId() {
    return this.configService.get("GOOGLE_CLIENT_ID", { infer: true });
  }

  get googleClientSecret() {
    return this.configService.get("GOOGLE_CLIENT_SECRET", { infer: true });
  }
}
