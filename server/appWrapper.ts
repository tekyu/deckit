import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import expressSession from "express-session";
import morgan from "morgan";

import chalk from "chalk";
import Passport from "./src/api/Passport";

const appWrapper = (IncomingPort = 3011) => {
  const app = express();
  const port = IncomingPort;

  /* APP */
  app.use(
    cors({
      methods: "GET,POST,PATCH,DELETE",
      optionsSuccessStatus: 200,
      origin: process.env.DEV_ADDRESS
    })
  );
  app.options(
    "*",
    cors({
      credentials: true,
      origin: process.env.DEV_ADDRESS,
      optionsSuccessStatus: 200
    })
  );
  app.use(morgan("tiny"));
  app.use(bodyParser.json());
  app.use(
    expressSession({
      secret: "hanabala dzis nie srala",
      resave: false, // required
      saveUninitialized: false // required
    })
  );
  app.use(Passport.initialize());
  app.use(Passport.session());
  app.listen(port, () =>
    console.log(chalk.black.bgGreen(`Server listening on port ${port}`))
  );
  app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });
  return app;
};
export default appWrapper;
