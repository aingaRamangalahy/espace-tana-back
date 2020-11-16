const express = require("express");
const chalk = require("chalk");
const config = require("./config");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const PORT = config.SERVER_PORT;
const ENV = config.NODE_ENV;

const app = express(); // initialize express

app.use(express.json()); // Body parser

// connect to database
connectDB();

// route files
const espaces = require("./routes/espace.route");
const auth = require("./routes/auth.route");
const users = require("./routes/user.route");

// security middlewares

// mount routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/espaces", espaces);
app.use("/api/v1/users", users);

// error handler
app.use(errorHandler);
const server = app.listen(
  PORT,
  console.log(chalk.blueBright`[${ENV} mode] Server running on port ${PORT}`)
);
