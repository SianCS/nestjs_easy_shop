import z from "zod";

export const cloudinarySchema = z.object({
  COULDINARY_API_KEY: z.string(),
  COULDINARY_API_SECRET: z.string(),
  COULDINARY_NAME: z.string(),
});

export type CloudinaryConfig = z.infer<typeof cloudinarySchema>;
