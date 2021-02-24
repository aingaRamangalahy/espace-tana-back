const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");

const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(protect, logout);

module.exports = router;
