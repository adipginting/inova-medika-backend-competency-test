import { Request, Response } from "express";
import { TokenService } from "../services/token.service";
import * as jwt from "jsonwebtoken";

export class TokenController {
  constructor(private tokenService: TokenService) {}
  public async generateToken(req: Request, res: Response) {
    try {
      const username: string = req.body.username;
      const password: string = req.body.password;

      const isValid = await this.tokenService.createToken({
        username,
        password,
      });

      if (isValid) {
        const token = jwt.sign(
          { username: username },
          process.env.JWT_SECRET || "secret",
          { expiresIn: "10m" }
        );
        res.status(200).json({ token: token });
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
