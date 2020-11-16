const express = require("express");
const {
  getEspaces,
  createEspace,
  getOneEspace,
  updateEspace,
  deleteEspace,
} = require("../controllers/espace.controller");

const router = express.Router();

router.route("/")
  .get(getEspaces)
  .post(createEspace);

router.route("/:_id")
  .get(getOneEspace)
  .put(updateEspace)
  .delete(deleteEspace);

module.exports = router;
