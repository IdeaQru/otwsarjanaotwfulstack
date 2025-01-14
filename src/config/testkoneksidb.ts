import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testConnection = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ais-dbnew?replicaSet=rs0";
    console.log("Connecting to:", mongoURI);

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    mongoose.connection.close();
  }
};

testConnection();
