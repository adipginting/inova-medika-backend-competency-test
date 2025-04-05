import { Application } from "express";
import { connectDb } from "./db";

export const startServer = async (app: Application, port: string | number) => {
  await connectDb();

  app.listen(port, () => {
    console.log("The app is listening to port", port);
  });
};
