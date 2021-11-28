const express = require("express");
const app = express();
const { port } = require("config/variables.ts");

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
