const express = require("express");
const {
  getEspaces,
  createEspace,
  getOneEspace,
  updateEspace,
  deleteEspace,
} = require("../controllers/espace.controller");
const advancedResults = require("../middlewares/advancedResults");
const Espace = require("../models/espace.model")

const router = express.Router();

const {protect, authorize} = require("../middlewares/auth")
router.route("/")
  .get(advancedResults(Espace), getEspaces)
  .post(createEspace);

router.route("/:_id")
  .get(getOneEspace)
  .put(updateEspace)
  .delete(deleteEspace);

module.exports = router;
