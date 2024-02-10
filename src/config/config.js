import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;
export const DEFAULT_USER_AVATAR_PATH = process.env.DEFAULT_USER_AVATAR_PATH;