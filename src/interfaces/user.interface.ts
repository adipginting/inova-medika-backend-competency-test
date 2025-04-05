import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  name: string;
  email: string;
  gender: string;
  password: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
