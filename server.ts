import express = require("express");
import http = require("http");
import expressJSDocSwagger from "express-jsdoc-swagger";

import variables from "./config/variables";
import routes from "./routes";
import db from "./config/db";

const swaggerOptions = {
  info: {
    version: "1.0.0",
    title: "todo-express-test",
    description: "Todo express test API",
    license: {
      name: "MIT",
    },
  },
  swaggerUIPath: variables.defaultUrl + "/api-docs",
  filesPattern: [
    "./models/swaggerTypes.ts",
    "./routes/*.ts",
    "./routes/*/*.ts",
  ],
  baseDir: __dirname,
};

const setupServer = async () => {
  await db();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routes(app);

  expressJSDocSwagger(app)(swaggerOptions);

  const server = http.createServer(app);

  server.listen(variables.port, () => {
    console.log(`Server listening at http://localhost:${variables.port}`);
  });
};

setupServer();
