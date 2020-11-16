const express = require("express");
const { getUsers, getOneUser } = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(getUsers);

router.route("/:_id").get(getOneUser);

module.exports = router;
