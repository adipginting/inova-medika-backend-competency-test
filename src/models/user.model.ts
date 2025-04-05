import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "../interfaces/user.interface";


export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

const UserSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  status: {
    type: Boolean,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<IUserDocument>("User", UserSchema);
