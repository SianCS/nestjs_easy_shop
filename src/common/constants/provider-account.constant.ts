export const PROVIDER_TYPE = {
  CREDENTIALS: "credentials",
  OAUTH: "oauth",
} as const;

export const PROVIDER = {
  CREDENTIALS: "credentials",
  GOOGLE: "google",
} as const;

export type ProviderType = (typeof PROVIDER_TYPE)[keyof typeof PROVIDER_TYPE];
export type Provider = (typeof PROVIDER)[keyof typeof PROVIDER];
