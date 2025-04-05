import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import * as argon2 from "argon2";
import mongoose from "mongoose";

async function hashPassword(password: string) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (e) {
    console.error("Password hash failed ", e);
    return "";
  }
}

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
      status: true,
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
