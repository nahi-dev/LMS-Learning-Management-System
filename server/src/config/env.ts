// config/env.ts - FIX THIS
import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;