const chalk = require("chalk");
const mongoose = require("mongoose");
const config = require("./index");
const connectDB = async () => {
  const con = await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(chalk.gray`[mongoDB]: connected at ${con.connection.host}`);
};

module.exports = connectDB;
