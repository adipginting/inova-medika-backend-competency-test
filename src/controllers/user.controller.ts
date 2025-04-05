import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { validateCreateUser } from "../utils/validate-create-user.util";
import { UserRepository } from "../repositories/user.repository";
import { validateUpdateUser } from "../utils/validate-update-user.util";

export class UserController {
  constructor(
    private userService: UserService,
    private userRepository: UserRepository
  ) {}
  public async createUser(req: Request, res: Response) {
    try {
      const { username, name, email, gender, password, status } = req.body;
      validateCreateUser({ username, name, email, gender, password, status });

      const doesUsernameExist =
        await this.userRepository.findUsername(username);
      if (doesUsernameExist) {
        res.status(400).json({
          success: false,
          message: "Username already exists.",
        });
        return;
      }

      const doesEmailExist = await this.userRepository.findEmail(email);
      if (doesEmailExist) {
        res.status(400).json({
          success: false,
          message: "Email already exists.",
        });
        return;
      }

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

  public async updateUser(req: Request, res: Response) {
    try {
      const { name, email, gender, status } = req.body;
      validateUpdateUser({ name, email, gender, status });

      const isUserUpdated = await this.userService.updateUser({
        name,
        email,
        gender,
        status,
      });

      if (isUserUpdated) {
        res.status(200).json({
          success: true,
          message: "User was updated.",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User not updated.",
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

  public async listUsers(req: Request, res: Response) {
    try {
      const { limit, offset } = req.params;
      const users = await this.userService.listUsers(
        Number(limit) || 10,
        Number(offset) || 0
      );
      if (users) {
        res.status(200).json({
          success: true,
          message: "Users found.",
          data: users,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "No users found.",
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

  public async detailUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.detailUser(
        id
      );
      if (user) {
        res.status(200).json({
          success: true,
          message: "User found.",
          data: user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "No user found.",
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
