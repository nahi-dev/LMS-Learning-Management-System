import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 1,
    });
    console.log("connected to the database");
    console.log("Database name:", mongoose.connection.db?.databaseName);
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};
export default connectToDatabase;
