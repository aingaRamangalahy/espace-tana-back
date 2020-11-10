const express = require("express");
const chalk = require("chalk");
const config = require("./config")
const connectDB = require("./config/db")
const app = express();
const PORT = config.SERVER_PORT ;
const ENV = config.NODE_ENV;

//connect to database
connectDB()

const server = app.listen(
  PORT,
  console.log(chalk.blueBright`[${ENV} mode] : Server running on port ${PORT}`)
);
