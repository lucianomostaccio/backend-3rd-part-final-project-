import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const DEFAULT_USER_AVATAR_PATH = process.env.DEFAULT_USER_AVATAR_PATH;
export const EXECUTION_MODE = "online";
