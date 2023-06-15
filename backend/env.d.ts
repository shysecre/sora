declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_USERNAME: string | null;
      POSTGRES_PASSWORD: string | null;
      POSTGRES_HOST: string | null;
      POSTGRES_PORT: string | null;
      POSTGRES_DB: string | null;
      CLIENT_ID: string | null;
      CLIENT_SECRET: string | null;
      CLIENT_URL: string | null;
      TWITCH_REDIRECT_URL: string | null;
      JWT_SECRET: string | null;
      TWITCH_CRED_SECRET: string | null;
      CIPHER_KEY_SECRET: string | null;
      SESSION_SECRET: string | null;
      ALGORITHM: string | null;
      HASHING_KEY: string | null;
      HASHING_IV: string | null;
    }
  }
}

export {};
