import z from "zod";
import { baseSchema } from "./base.schema";
import { jwtSchema } from "./jwt.schema";

export const envSehema = baseSchema.and(jwtSchema);

export type EnvConfig = z.infer<typeof envSehema>;

export const validate = (config: Record<string, any>) => {
  const { data, success, error } = envSehema.safeParse(config);
  if (!success) {
    throw new Error(`ENV validation fail \n${z.prettifyError(error)}`);
  }
  return data;
};
