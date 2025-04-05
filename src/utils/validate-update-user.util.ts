import { UserDTO } from "../dtos/user.dto";

export function validateUpdateUser(userDto: UserDTO) {
  if (!userDto.name) {
    throw new Error("Name is required");
  }
  if (!userDto.email) {
    throw new Error("Email is required");
  }
  if (!userDto.gender) {
    throw new Error("Gender is required");
  }
}
