import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env";

// Validate environment variable at the top and get a guaranteed string
const connectionString = MONGODB_URI;
if (!connectionString) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const connectToDatabase = async (): Promise<void> => {
  try {
    // ADDED: Type-safe connection options with enhanced settings
    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 30000, // 30 seconds - time to wait for server selection
      socketTimeoutMS: 45000, // 45 seconds - time to wait for socket operations
      bufferCommands: false, // Disable mongoose buffering - better error handling
      maxPoolSize: 10, // Maximum number of sockets in the connection pool
      minPoolSize: 1, // Minimum number of sockets in the connection pool
      retryWrites: true, // ADDED: Retry write operations on network errors
      retryReads: true, // ADDED: Retry read operations on network errors
    };

    // FIXED: Use the validated connectionString variable instead of MONGODB_URI directly
    await mongoose.connect(connectionString, options);
    
    // ADDED: More descriptive success messages with emojis for better visibility
    console.log("✅ Connected to the database successfully");
    console.log("📊 Database name:", mongoose.connection.db?.databaseName);
    // FIXED: Use the validated connectionString variable
    console.log("🔗 MongoDB URI:", connectionString.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

  } catch (error) {
    // ADDED: More specific error handling and logging
    console.error("❌ Error connecting to the database:", error);
    
    // ADDED: Check if it's a Mongoose-specific error
    if (error instanceof mongoose.Error) {
      console.error("Mongoose error details:", error.message);
    }
    
    // Exit with error code
    process.exit(1);
  }
};

// ADDED: Event listeners for better connection monitoring
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from MongoDB');
});

// ADDED: Graceful shutdown handling for proper cleanup
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('⏹️ MongoDB connection closed through app termination');
  process.exit(0);
});

export default connectToDatabase;