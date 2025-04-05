import { UserDTO } from "../dtos/user.dto";
import { IUserResponse } from "./userResponse.interface";

export interface IUserRepository {
  createUser(userDto: UserDTO): Promise<boolean>;
  findEmail(email: string): Promise<boolean>;
  findUsername(username: string): Promise<boolean>;
  updateUser(userDto: UserDTO): Promise<boolean>;
  // deleteUser(userId: string): Promise<string>;
  listUsers(limit: number, offset: number): Promise<IUserResponse[]>;
  detailUser(userId: string): Promise<IUserResponse | null>;
}
