import mongoose from "mongoose";

const MONGODB_URI = `${process.env.MONGODB_URI}journey`;

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);

    isConnected = conn.connections[0].readyState === 1;

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // stop the app if DB fails
  }
};

export default connectDB;
