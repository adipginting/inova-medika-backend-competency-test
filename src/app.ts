import express, { Express, Request, Response, Application } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import { TokenController } from "./controllers/token.controller";
import { TokenService } from "./services/token.service";
import { TokenDbRepository } from "./db-repository/token.db-repository";

const tokenService = new TokenService(new TokenDbRepository());
const tokenController = new TokenController(tokenService);

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.post("/getToken", tokenController.generateToken.bind(tokenController));

export default app;
