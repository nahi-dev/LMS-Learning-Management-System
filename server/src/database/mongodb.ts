import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};
export default connectToDatabase;
