import { UserDTO } from "../dtos/user.dto";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { User } from "../models/user.model";
import { hashPassword } from "../utils/hash-password.util";

export class UserRepository implements IUserRepository {
  public async createUser(userDto: UserDTO): Promise<boolean> {
    try {
      const userDtoPasswordHashed = {
        ...userDto,
        password: await hashPassword(userDto.password as string),
      };
      const user = new User(userDtoPasswordHashed);
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

  public async findEmail(email: string): Promise<boolean> {
    try {
      const result = await User.findOne({ email });
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error in findEmail");
    }
  }

  public async findUsername(username: string): Promise<boolean> {
    try {
      const result = await User.findOne({ username });
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error finding user by username:", error);
      throw new Error("Error in findUsername");
    }
  }

  public async updateUser(userDto: UserDTO): Promise<boolean> {
    try {
      const result = await User.updateOne(
        { email: userDto.email },
        {
          name: userDto.name,
          gender: userDto.gender,
          status: userDto.status,
        }
      );

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
