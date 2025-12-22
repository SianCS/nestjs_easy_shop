import z from "zod";

export const mailerSchema = z.object({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().int().min(0).max(65535),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
});

export type MailerConfig = z.infer<typeof mailerSchema>;
