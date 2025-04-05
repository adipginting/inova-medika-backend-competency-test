import { ITokenRepository } from "../interfaces/token.repository.interface";
import { User } from "../models/user.model";

export class TokenRepository implements ITokenRepository {
  public async checkUser(
    username: string
  ): Promise<{ username: string; password: string } | null> {
    try {
      const user = await User.findOne({ username });
      if (user) {
        return { username: user.username, password: user.password };
      }
      return null;
    } catch (error) {
      console.error("Error checking user:", error);
      throw new Error("Failed to check user");
    }
  }
}
