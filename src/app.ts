import express, { Request, Response, Application, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import cors from "cors";
import cookieParser from "cookie-parser";
import { TokenController } from "./controllers/token.controller";
import { TokenService } from "./services/token.service";
import { TokenRepository } from "./repositories/token.repository";
import { JsonWebTokenError } from "jsonwebtoken";

const tokenService = new TokenService(new TokenRepository());
const tokenController = new TokenController(tokenService);

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

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

app.get("/", authMiddleware, (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.post("/getToken", tokenController.generateToken.bind(tokenController));

export default app;
