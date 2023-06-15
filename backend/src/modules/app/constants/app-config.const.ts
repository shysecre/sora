import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';

const envName = process.env.NODE_ENV ? `.env` : `.env.dev`;
const filePath = join(process.cwd(), envName);

export const APP_CONFIG_OPTIONS = {
  envFilePath: filePath,
  isGlobal: true,
  validationSchema: Joi.object({
    POSTGRES_USERNAME: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    CLIENT_ID: Joi.string().required(),
    CLIENT_SECRET: Joi.string().required(),
    CLIENT_URL: Joi.string().required(),
    TWITCH_REDIRECT_URL: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    TWITCH_CRED_SECRET: Joi.string().required(),
    CIPHER_KEY_SECRET: Joi.string().required(),
    ALGORITHM: Joi.string().required(),
    HASHING_KEY: Joi.string().required(),
    HASHING_IV: Joi.string().required(),
  }),
} satisfies ConfigModuleOptions;
