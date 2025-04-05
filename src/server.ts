import app from "./app";
import dotenv from "dotenv";
import { startServer } from "./config/start-server";

const main = async () => {
  dotenv.config();
  const port = process.env.PORT || 3000;

  await startServer(app, port);
};

main();
