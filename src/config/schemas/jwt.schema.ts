import { z } from "zod";

export const jwtSchema = z.object({
  ACCESS_JWT_SECRET: z.string().min(32),
  ACCESS_JWT_EXPIRATION_TIME: z.coerce.number().int().positive(),
});
export type JwtConfig = z.infer<typeof jwtSchema>;
