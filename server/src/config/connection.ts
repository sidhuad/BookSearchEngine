import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Database connected");
    return mongoose.connection;
  } catch (err) {
    console.error("Database connection error: ", err);
    throw new Error("Database connection failed.");
  }
};

export default db;
