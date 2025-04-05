import { UserDTO } from "../dtos/user.dto";

export function validateCreateUser(userDto: UserDTO) {
  if (!userDto.username) {
    throw new Error("Username is required");
  }
  if (!userDto.name) {
    throw new Error("Name is required");
  }
  if (!userDto.email) {
    throw new Error("Email is required");
  }

  if (!userDto.password) {
    throw new Error("Password is required");
  }

  if (!userDto.gender) {
    throw new Error("Gender is required");
  }
}
