import express, { Express, Request, Response, Application } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});



export default app;
