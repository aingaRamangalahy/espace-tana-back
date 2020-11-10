const express = require("express");
const chalk = require("chalk");
const config = require("./config")

const app = express();
const PORT = config.SERVER_PORT ;
const ENV = config.NODE_ENV;


const server = app.listen(
  PORT,
  console.log(chalk.blueBright`[${ENV} mode] : Server running on port ${PORT}`)
);
