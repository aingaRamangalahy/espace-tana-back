const express = require("express");
const chalk = require("chalk");
const config = require("./config");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHanlder");

const app = express();
const PORT = config.SERVER_PORT;
const ENV = config.NODE_ENV;

// connect to database
connectDB();

// route files
const espaces = require("./routers/espace.route");

// security middlewares

// mount routes
app.use("/api/v1/espaces", espaces);

// error handler
app.use(errorHandler);
const server = app.listen(
  PORT,
  console.log(chalk.blueBright`[${ENV} mode] Server running on port ${PORT}`)
);
