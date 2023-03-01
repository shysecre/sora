declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_USERNAME: string | null;
      POSTGRES_PASSWORD: string | null;
      POSTGRES_HOST: string | null;
      POSTGRES_PORT: string | null;
      POSTGRES_DATABASE: string | null;
      CLIENT_ID: string | null;
      CLIENT_SECRET: string | null;
      TWITCH_REDIRECT_URL: string | null;
    }
  }
}

export {};
