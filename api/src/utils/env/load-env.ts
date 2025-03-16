import * as dotenv from 'dotenv';

export function loadEnv() {
  return dotenv.config({
    path: ['.env', '.env.development', '.env.development.local'],
  });
}

loadEnv();

export type EnvKeys = 'JWT_SECRET' | 'ADMIN_USER' | 'ADMIN_PWD' | 'PRINTER_URL';

export const env = new Proxy(process.env as Record<EnvKeys, string>, {
  get: (target, key: EnvKeys) => {
    const value = target[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  },
});
