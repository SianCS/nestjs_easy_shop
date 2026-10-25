import z from "zod";
import { baseSchema } from "./base.schema";
import { jwtSchema } from "./jwt.schema";
import { authSchema } from "./auth.schema";
import { mailerSchema } from "./mailer.schema";
import { googleSchema } from "./google.schema";
import { cloudinarySchema } from "./cloudinary.schema";

export const envSchema = baseSchema
  .and(jwtSchema)
  .and(authSchema)
  .and(mailerSchema)
  .and(googleSchema)
  .and(cloudinarySchema);

export type EnvConfig = z.infer<typeof envSchema>;

export const validate = (config: Record<string, any>) => {
  const { data, success, error } = envSchema.safeParse(config);
  if (!success) {
    throw new Error(`ENV validation fail \n${z.prettifyError(error)}`);
  }
  return data;
};
