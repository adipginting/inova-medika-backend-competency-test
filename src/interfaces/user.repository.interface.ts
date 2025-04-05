import { UserDTO } from "../dtos/user.dto";

export interface IUserRepository {
  createUser(userDto: UserDTO): Promise<boolean>;
  // updateUser(userInfo: {
  //   name: string;
  //   gender: string;
  //   email: string;
  //   status: boolean;
  // }): Promise<string>;
  // deleteUser(userId: string): Promise<string>;
  // listUser(username: string): Promise<IUserService[]>;
  // detailUser(userId: string): Promise<IUserService>;
}
