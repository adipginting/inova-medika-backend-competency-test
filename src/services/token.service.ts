import { IToken } from "../interfaces/token.interface";
import { TokenDbRepository } from "../db-repository/token.db-repository";
import * as argon2 from "argon2";


export class TokenService {
  constructor(private tokenDbRepository: TokenDbRepository) {}
  public async createToken(cred: IToken) {
    try {
      const user = await this.tokenDbRepository.checkUser(cred.username);
      if (!user) {
        throw new Error("User not found");
      }

      if (!(await argon2.verify(user.password, cred.password))) {
        throw new Error("Invalid password");
      }

      return true;
    } catch (error) {
      console.error("Error creating token", error);
      throw new Error("Error creating token");
    }
  }
}
