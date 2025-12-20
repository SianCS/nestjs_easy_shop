import z from "zod";

export const baseSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test", "staging"]),
  PORT: z.coerce.number().int().min(0).max(65535),
  DATABASE_URL: z.url(),
});

export type BaseConfig = z.infer<typeof baseSchema>;
