import express, { Request, Response, Application, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import cors from "cors";
import cookieParser from "cookie-parser";
import { TokenController } from "./controllers/token.controller";
import { TokenService } from "./services/token.service";
import { TokenRepository } from "./repositories/token.repository";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";
import { JsonWebTokenError } from "jsonwebtoken";
import { use } from "chai";

const tokenService = new TokenService(new TokenRepository());
const tokenController = new TokenController(tokenService);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService, userRepository);

const route: Application = express();

route.use(express.urlencoded({ extended: true }));
route.use(express.json());
route.use(cors({ credentials: true }));
route.use(cookieParser());

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }

    const bearer = token.split(" ");
    const bearerToken = bearer[1];

    if (!bearerToken) {
      res.status(401).send("Unauthorized");
      return;
    }

    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET || "secret");
    if (!decoded) {
      res.status(401).send("Unauthorized");
      return;
    }
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(403).send("Token invalid or expired");
    } else {
      res.status(500).send("Internal server error");
    }
  }
}

route.get("/", authMiddleware, (req: Request, res: Response) => {
  res.send("Hello world!");
});

route.post("/getToken", tokenController.generateToken.bind(tokenController));
route.post(
  "/createUser",
  authMiddleware,
  userController.createUser.bind(userController)
);

route.post(
  "/updateUser",
  authMiddleware,
  userController.updateUser.bind(userController)
);

route.get(
  "/listUser/:limit/:offset",
  authMiddleware,
  userController.listUsers.bind(userController)
);

route.get(
  "/detailUser/:id",
  authMiddleware,
  userController.detailUser.bind(userController)
);

route.delete(
  "/deleteUser/:id",
  authMiddleware,
  userController.deleteUser.bind(userController)
);

export default route;
