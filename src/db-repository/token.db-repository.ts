import { ITokenService } from "../interfaces/token.service.interface";
import { User } from "../models/user.model";

export class TokenDbRepository implements ITokenService {
  public async checkUser(
    username: string
  ): Promise<{ username: string; password: string } | null> {
    const user = await User.findOne({ username });
    if (user) {
      return { username: user.username, password: user.password };
    }
    return null;
  }
}
