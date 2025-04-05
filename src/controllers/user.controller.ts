import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}
  public async generateUser(req: Request, res: Response) {
    try {
      const { username, name, email, gender, password, status } = req.body;

      const isUserCreated = await this.userService.createUser({
        username,
        name,
        email,
        gender,
        password,
        status,
      });
      if (isUserCreated) {
        res.status(200).json({
          success: true,
          message: "User was generated.",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User not created.",
        });
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
