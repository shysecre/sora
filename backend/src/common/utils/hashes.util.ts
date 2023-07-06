import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
} from 'crypto';

export const encrypt = (text: string) => {
  const cipher = createCipheriv(
    process.env.ALGORITHM,
    Buffer.from(process.env.HASHING_KEY),
    process.env.HASHING_IV,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
};

export const decrypt = (text: string) => {
  const encryptedText = Buffer.from(text, 'hex');
  const decipher = createDecipheriv(
    process.env.ALGORITHM,
    Buffer.from(process.env.HASHING_KEY),
    process.env.HASHING_IV,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export const hash = (text: string) => {
  return createHash('sha256').update(text).digest('hex');
};

export const compareHash = (toCompare: string, hashedData: string) => {
  return hash(toCompare) === hashedData;
};

export const getHmac = (secret: string, text: string) => {
  return createHmac('sha256', secret).update(text).digest('hex');
};
