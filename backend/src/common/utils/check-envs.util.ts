import { Logger } from '@nestjs/common';
import { object, string } from 'yup';

export default (async () => {
  const logger = new Logger();

  try {
    await object({
      POSTGRES_USERNAME: string().required(),
      POSTGRES_PASSWORD: string().required(),
      POSTGRES_HOST: string().required(),
      POSTGRES_PORT: string().required(),
      POSTGRES_DATABASE: string().required(),
      CLIENT_ID: string().required(),
      CLIENT_SECRET: string().required(),
      TWITCH_REDIRECT_URL: string().required(),
    }).validate(process.env);

    logger.log('.env file passed validation', 'ENV VALIDATION');
  } catch (err) {
    logger.error(".env file doesn't match validation schema", 'ENV VALIDATION');
    process.exit(0);
  }
})();
