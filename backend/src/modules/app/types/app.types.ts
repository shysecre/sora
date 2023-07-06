export interface EnvObject {
  POSTGRES_USERNAME: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_DB: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  CLIENT_URL: string;
  TWITCH_REDIRECT_URL: string;
  JWT_SECRET: string;
  TWITCH_CRED_SECRET: string;
  CIPHER_KEY_SECRET: string;
  SESSION_SECRET: string;
  ALGORITHM: string;
  HASHING_KEY: string;
  HASHING_IV: string;
  TWITCH_EVENT_SUB_SECRET: string;
  TWITCH_EVENT_SUB_CALLBACK: string;
}
