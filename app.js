import * as dotenv from "dotenv";
import express from "express";
dotenv.config();

// Get env variables
const { PORT } = process.env;

// Build app
const app = express();
app.listen(PORT, () => {
  console.log("app is listening on port: ", PORT);
});

// Routes
