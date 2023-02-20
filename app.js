import express from "express";
import config from "./config/config.js";
import db from "./server/model/database/conneciton.js";

const { port } = config.server;

// Build app
const app = express();
app.listen(port, () => {
  console.log("app is listening on port: ", port);
});

// Routes
