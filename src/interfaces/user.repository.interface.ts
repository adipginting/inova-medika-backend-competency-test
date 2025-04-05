import { UserDTO } from "../dtos/user.dto";

export interface IUserRepository {
  createUser(userDto: UserDTO): Promise<boolean>;
  findEmail(email: string): Promise<boolean>;
  findUsername(username: string): Promise<boolean>;
  updateUser(userDto: UserDTO): Promise<boolean>;
  // deleteUser(userId: string): Promise<string>;
  // listUser(username: string): Promise<IUserService[]>;
  // detailUser(userId: string): Promise<IUserService>;
}
