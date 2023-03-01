import { randomBytes } from 'crypto';

export const generateRandomState = (bytes: number) => {
  return randomBytes(bytes).toString('hex');
};
