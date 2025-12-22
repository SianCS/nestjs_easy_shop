import { Injectable } from "@nestjs/common";
import { BaseConfig } from "../schemas/base.schema";
import { ConfigService } from "@nestjs/config/dist/config.service";

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<BaseConfig, true>,
  ) {}

  get frontendUrl() {
    return this.configService.get("FRONTEND_URL", { infer: true });
  }
}
