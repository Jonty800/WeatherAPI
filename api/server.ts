import express, { Express } from "express";
import dotenv from "dotenv"; //allows access to process.env
import cors from "cors";
import compression from "compression";
import basicAuth from "express-basic-auth";
import { getUnauthorizedResponse } from "./utils";
import database from "./database";
import { query } from "express-validator";

dotenv.config(); //loads env variables from .env file

export function startServer(): Express {
  const app: Express = express(); //creates express app
  const weatherRouter = require("./routes/weather");
  const basicAuthUsername: string = process.env.BASIC_AUTH_USERNAME || ""; //sets basic auth username
  const basicAuthPassword: string = process.env.BASIC_AUTH_PASSWORD || ""; //sets basic auth password

  //middleware

  //cors allows access from any origin
  app.use(cors());
  //basic auth for api access
  app.use(
    basicAuth({
      //basic auth middleware - some simple protection of the API
      users: {
        [basicAuthUsername]: basicAuthPassword,
      },
      unauthorizedResponse: getUnauthorizedResponse,
    })
  );
  //compression compresses response bodies for smaller payloads
  app.use(compression());
  //parses json data from request body
  app.use(express.json());

  //routes
  app.use(
    "/v1/weather",
    query("postcode").isString().isLength({ min: 3 }), //validation
    query("end_date").isString(),
    query("start_date").isString(),
    weatherRouter
  ); //sets weather router

  return app;
}

const port: string = process.env.PORT || "9000"; //sets port

//start server
startServer().listen(port, async () => {
  //listens on port
  console.log(`App listening on port ${port}`);
  await database.initDb(database.connection); //initialises db
});
