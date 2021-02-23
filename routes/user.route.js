const express = require("express");
const User = require("../models/user.model");
const {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const advancedResults = require("../middlewares/advancedResults");
const {protect, authorize} = require("../middlewares/auth");
const router = express.Router();

/**only admin authorized */
router.use(protect);
router.use(authorize("admin"));

router.route("/").get( advancedResults(User), getUsers);

router.route("/:_id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
