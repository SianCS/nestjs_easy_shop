import z from "zod";
import { baseSchema } from "./base.schema";
import { jwtSchema } from "./jwt.schema";
import { authSchema } from "./auth.schema";
import { mailerSchema } from "./mailer.schema";
import { googleSehema } from "./google.schema";
import { couldinarySchema } from "./cloudinary.schema";

export const envSehema = baseSchema
  .and(jwtSchema)
  .and(authSchema)
  .and(mailerSchema)
  .and(googleSehema)
  .and(couldinarySchema);

export type EnvConfig = z.infer<typeof envSehema>;

export const validate = (config: Record<string, any>) => {
  const { data, success, error } = envSehema.safeParse(config);
  if (!success) {
    throw new Error(`ENV validation fail \n${z.prettifyError(error)}`);
  }
  return data;
};
