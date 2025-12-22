import z from "zod";

export const authSchema = z.object({
  CONFIRMATION_EMAIL_TOKEN_TTL: z.coerce.number().int().positive(),
});

export type AuthConfig = z.infer<typeof authSchema>;
