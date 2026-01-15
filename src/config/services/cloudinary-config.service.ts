import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CloudinaryConfig } from "../schemas/cloudinary.schema";

@Injectable()
export class CloudinaryConfigService {
  constructor(
    private readonly configService: ConfigService<CloudinaryConfig, true>,
  ) {}

  get name() {
    return this.configService.get("COULDINARY_NAME", { infer: true });
  }

  get apiKey() {
    return this.configService.get("COULDINARY_API_KEY", { infer: true });
  }

  get apiSecret() {
    return this.configService.get("COULDINARY_API_SECRET", { infer: true });
  }
}
