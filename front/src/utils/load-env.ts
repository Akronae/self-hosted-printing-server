import dotenv from "dotenv";

export function loadEnv() {
  return dotenv.config({
    path: [".env", ".env.development", ".env.development.local"],
  });
}
