import { capitalizeFirstLetter } from './capitalize-first-letter.util';

export const createAuthHeader = (tokenType: string, token: string) => {
  return `${capitalizeFirstLetter(tokenType)} ${token}`;
};
