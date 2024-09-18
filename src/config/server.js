import cors from "cors";
import express, { urlencoded, json } from "express";
import morgan from "morgan";
import helmet from "helmet";

import routeApi from "../routes/api.js";

const createServer = () => {
  const app = express();
  const corsOptions = {
    origin: process.env.CORS_ORIGIN_ALLOWED,
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.use(morgan("dev"));
  app.use(cors(corsOptions));
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(helmet());
  app.set("json spaces", 2);

  app.use("/", routeApi);

  return app;
};

export default createServer;
