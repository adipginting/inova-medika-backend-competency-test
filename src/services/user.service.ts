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
}
