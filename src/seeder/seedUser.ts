import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import mongoose from "mongoose";
import { hashPassword } from "../utils/hash-password.util";



export const seed = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.DB_STRING || "mongodb://127.0.0.1:27017/test"
    );

    const user: IUser = {
      username: "timInova",
      name: "timInova",
      email: "test@test.com",
      gender: "male",
      status: "active",
      password: await hashPassword("1Team1Semangat1Tujuan"),
    };

    await User.create(user);
    console.log("Seed is done.");
    mongoose.disconnect();
  } catch (e) {
    console.error("Error connecting with mongodb", e);
  }
};

seed();
