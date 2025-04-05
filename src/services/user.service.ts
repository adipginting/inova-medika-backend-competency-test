import { UserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}
  public async createUser(userDto: UserDTO) {
    try {
      const isUserCreated = await this.userRepository.createUser(userDto);
      if (isUserCreated) {
        return true;
      }
      throw new Error("User not created");
    } catch (error) {
      console.error("Error creating user", error);
      throw new Error("Error creating user");
    }
  }

  public async updateUser(userDto: UserDTO) {
    try {
      const isUserUpdated = await this.userRepository.updateUser(userDto);
      if (isUserUpdated) {
        return true;
      }
      throw new Error("User not updated");
    } catch (error) {
      console.error("Error updating user", error);
      throw new Error("Error updating user");
    }
  }

  public async listUsers(limit: number, offset: number) {
    try {
      const users = await this.userRepository.listUsers(limit, offset);
      if (users) {
        return users;
      }
      throw new Error("No users found");
    } catch (error) {
      console.error("Error listing users", error);
      throw new Error("Error listing users");
    }
  }
  public async detailUser(id: string) {
    try {
      const user = await this.userRepository.detailUser(id);
      if (user) {
        return user;
      }
      throw new Error("No users found");
    } catch (error) {
      console.error("Error showing user", error);
      throw new Error("Error showing");
    }
  }

  public async deleteUser(id: string) {
    try {
      const user = await this.userRepository.deleteUser(id);
      if (user) {
        return user;
      }
      throw new Error("No users found");
    } catch (error) {
      console.error("Error deleting user", error);
      throw new Error("Error deleting user");
    }
  }
}
