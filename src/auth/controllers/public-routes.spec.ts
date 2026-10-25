import { Type } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { CredentialsController } from "./credentials.controller";
import { GoogleController } from "./google.controller";
import { UsersController } from "src/users/users.controller";

// JwtAuthGuard เป็น global guard: route ที่ต้องเรียกได้ก่อน login ต้องมี @Public()
// ถ้าลืม จะไม่มีใครสมัครหรือ login ได้เลย
describe("public routes", () => {
  const reflector = new Reflector();
  const isPublic = (controller: Type, handler: string) =>
    reflector.getAllAndOverride<boolean | undefined>(IS_PUBLIC_KEY, [
      (controller.prototype as Record<string, () => unknown>)[handler],
      controller,
    ]);

  it.each(["register", "confirmEmail", "resendVerificationEmail", "login"])(
    "CredentialsController.%s is public",
    (handler) => {
      expect(isPublic(CredentialsController, handler)).toBe(true);
    },
  );

  it.each(["googleConsent", "googleRedirect"])(
    "GoogleController.%s is public",
    (handler) => {
      expect(isPublic(GoogleController, handler)).toBe(true);
    },
  );

  it("UsersController.update requires a token", () => {
    expect(isPublic(UsersController, "update")).toBeFalsy();
  });
});
