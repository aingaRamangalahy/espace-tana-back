const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Veuillez ajouter votre prénom"],
  },

  lastName: {
    type: String,
    required: [true, "Veuillez ajouter votre nom"],
  },

  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Veuillez ajouter une adresse email valide",
    ],
    required: true,
    unique: true
  },

  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },

  connected: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: [true, "Veuillez ajouter un mot de passe"],
    minlength: 6,
    select: false,
  },

  profile: {
    type: String,
    required: false,
    default: "no-profile.jpg"
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
  if (!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, salt);
});

/** methods and statics */
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    config.SECRET_TOKEN
  );
};

UserSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
