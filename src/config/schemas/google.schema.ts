import { z } from "zod";

export const googleSehema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export type GoogleConfig = z.infer<typeof googleSehema>;
