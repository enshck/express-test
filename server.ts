import express = require("express");
import http = require("http");

import variables from "./config/variables";
import routes from "./routes";
import db from "./config/db";

const setupServer = async () => {
  await db();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routes(app);

  const server = http.createServer(app);

  server.listen(variables.port, () => {
    console.log(`Server listening at http://localhost:${variables.port}`);
  });
};

setupServer();
