export const PROVIDER_TYPE = {
  CREDENTIAL: "credential",
  OAUTH: "oauth",
};

export const PROVIDER = {
  CREDENTIAL: "credential",
  GOOGLE: "google",
};

export type ProviderType = (typeof PROVIDER_TYPE)[keyof typeof PROVIDER_TYPE];
export type Provider = (typeof PROVIDER)[keyof typeof PROVIDER];
