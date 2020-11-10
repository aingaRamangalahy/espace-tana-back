const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`) });

const config = {
  NODE_ENV: process.env.NODE_ENV,
  SERVER_PORT: process.env["SERVER_PORT"],
  SERVER_HOST: process.env["SERVER_HOST"],
  MONGODB_URI: process.env["MONGODB_URI"],
  SECRET_TOKEN: process.env["SECRET_TOKEN"],
  GMAIL_ACCOUNT: process.env["GMAIL_ACCOUNT"],
  GMAIL_PASSWORD: process.env["GMAIL_PASSWORD"],
  FROM_EMAIL: process.env["FROM_EMAIL"],
  FROM_NAME: process.env["FROM_NAME"],
};

module.exports = config;