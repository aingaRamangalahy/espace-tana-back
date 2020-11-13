const express = require("express");
const {
  getEspaces,
  createEspace,
  getEspace,
  updateEspace,
  deleteEspace,
} = require("../controllers/espace.controller");

const router = express.Router();

router.route("/")
  .get(getEspaces)
  .post(createEspace);

router.route("/:id")
  .get(getEspace)
  .put(updateEspace)
  .delete(deleteEspace);

module.exports = router;
