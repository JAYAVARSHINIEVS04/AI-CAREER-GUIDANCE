import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

/**
 * connectDB
 * Establishes a connection to MongoDB using Mongoose. If the configured
 * MongoDB URI is unavailable, it falls back to an in-memory MongoDB server
 * so the project can run locally without an external database.
 */
const connectDB = async () => {
  console.log("🔄 Initializing database connection...");
  
  const getMongoUri = async () => {
    if (process.env.MONGO_URI && process.env.MONGO_URI.trim()) {
      console.log("📦 Using provided MONGO_URI");
      return process.env.MONGO_URI;
    }

    console.log("⏳ Creating in-memory MongoDB server...");
    const mongoServer = await MongoMemoryServer.create();
    console.log("✅ In-memory MongoDB created");
    return mongoServer.getUri();
  };

  try {
    const mongoUri = await getMongoUri();
    console.log("🔗 Connecting to MongoDB...");
    const conn = await mongoose.connect(mongoUri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.log("⏳ Falling back to in-memory MongoDB...");

    try {
      const mongoServer = await MongoMemoryServer.create();
      console.log("✅ In-memory MongoDB created");
      const conn = await mongoose.connect(mongoServer.getUri(), {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`❌ Fallback failed: ${fallbackError.message}`);
      throw fallbackError;
    }
  }
};

export default connectDB;
