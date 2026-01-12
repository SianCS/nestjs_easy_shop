import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { GoogleConfigService } from "src/config/services/google-config.service";
import { GoogleUserValidator } from "../validators/google-user.validator";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private googleConfig: GoogleConfigService,
    private readonly googleUserValidator: GoogleUserValidator,
  ) {
    super({
      clientID: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackUri,
      scope: ["email", "profile"],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const googleUserDto = await this.googleUserValidator.validate({
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
    });
    done(null, googleUserDto);
  }
}
