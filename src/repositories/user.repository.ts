import { UserDTO } from "../dtos/user.dto";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { IUserResponse } from "../interfaces/userResponse.interface";
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

  public async listUsers(
    limit: number,
    offset: number
  ): Promise<IUserResponse[]> {
    try {
      const result = await User.find({}).limit(limit).skip(offset);

      if (result) {
        return result.map((user) => ({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          status: user.status,
          username: user.username,
          gender: user.gender,
        }));
      } else {
        throw new Error("Users not found");
      }
    } catch (error) {
      console.error("Error to list users:", error);
      throw new Error("Failed to list users");
    }
  }

  public async deleteUser(id: string): Promise<IUserResponse | null> {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw new Error("User not found");
      }

      const deleted = await User.deleteOne({ _id: id });
      if (deleted.deletedCount === 0) {
        throw new Error("User not deleted");
      }

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        status: user.status,
        username: user.username,
        gender: user.gender,
      };
    } catch (error) {
      console.error("Error to delete user:", error);
      throw new Error("Failed to delete user");
    }
  }

  public async detailUser(id: string): Promise<IUserResponse | null> {
    try {
      const user = await User.findOne({ _id: id });

      if (user) {
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          status: user.status,
          username: user.username,
          gender: user.gender,
        };
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error to show user:", error);
      throw new Error("Failed to show user");
    }
  }
}
