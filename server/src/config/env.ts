import { config } from "dotenv";
config();
export const { PORT, MONGODB_URI, CLERK_WEBHOOK_SECRET } = process.env || 5000;
