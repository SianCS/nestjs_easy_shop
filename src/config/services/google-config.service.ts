import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleConfig } from "../schemas/google.schema";

@Injectable()
export class GoogleConfigService {
  constructor(
    private readonly configService: ConfigService<GoogleConfig, true>,
  ) {}

  get clientId() {
    return this.configService.get("GOOGLE_CLIENT_ID", { infer: true });
  }

  get clientSecret() {
    return this.configService.get("GOOGLE_CLIENT_SECRET", { infer: true });
  }

  get callbackUri() {
    return this.configService.get("GOOGLE_CALLBACK_URI", { infer: true });
  }
}
