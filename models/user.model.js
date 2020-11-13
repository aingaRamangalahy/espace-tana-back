const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez ajouter un nom"],
  },

  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Veuillez ajouter une adresse email valide",
    ],
    required: false,
  },

  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Veuillez ajouter un mot de passe"],
    minlength: 6,
    select: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAd: {
    type: Date,
    default: Date.now,
  },
});

// Encrypte user password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/** methods and statics */
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.SECRET_TOKEN, {
    expiresIn: "10m",
  });
};

UserSchema.methods.comparePassword(async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
});
module.exports = mongoose.model("User", UserSchema);
