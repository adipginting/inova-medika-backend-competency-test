import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
  } catch (e) {
    console.error("Error connecting with mongodb", e);
  }
};
