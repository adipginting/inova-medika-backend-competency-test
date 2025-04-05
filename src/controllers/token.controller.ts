import { Request, Response } from "express";
import { TokenService } from "../services/token.service";

export class TokenController {
  constructor(private tokenService: TokenService) {}
  public async generateToken(req: Request, res: Response) {
    try {
      const username: string = req.body.username;
      const password: string = req.body.password;
      if (
        (await this.tokenService.createToken({ username, password })) ===
        "token"
      ) {
        res.status(200).json({ message: "Token was generated." });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occured.",
      });
    }
  }
}
