export const PROVIDER_TYPE = {
  CREDENTIALS: "credentials",
  OAUTH: "oauth",
};

export const PROVIDER = {
  CREDENTIALS: "credentials",
  GOOGLE: "google",
};

export type ProviderType = (typeof PROVIDER_TYPE)[keyof typeof PROVIDER_TYPE];
export type Provider = (typeof PROVIDER)[keyof typeof PROVIDER];
