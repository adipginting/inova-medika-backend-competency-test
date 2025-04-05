import { UserDTO } from "../dtos/user.dto";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { User } from "../models/user.model";

export class UserRepository implements IUserRepository {
  public async createUser(userDto: UserDTO): Promise<boolean> {
    try {
      const user = new User(userDto);
      const result = await user.save();
      if (result) {
        return true;
      } else {
        throw new Error("User not created");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
  // updateUser(userInfo: { name: string; gender: string; email: string; status: boolean; }): Promise<string> {
  //   throw new Error("Method not implemented.");
  // }
  // deleteUser(userId: string): Promise<string> {
  //   throw new Error("Method not implemented.");
  // }
  // listUser(username: string): Promise<IUserService[]> {
  //   throw new Error("Method not implemented.");
  // }
  // detailUser(userId: string): Promise<IUserService> {
  //   throw new Error("Method not implemented.");
  // }
}
