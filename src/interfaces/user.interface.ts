import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  name: string;
  email: string;
  gender: string;
  status: boolean;
  password: string,
  createdAt?: Date;
  updatedAt?: Date;
}
