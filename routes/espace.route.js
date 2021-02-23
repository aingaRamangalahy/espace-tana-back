const express = require("express");
const {
  getEspaces,
  createEspace,
  getOneEspace,
  updateEspace,
  deleteEspace,
} = require("../controllers/espace.controller");
const advancedResults = require("../middlewares/advancedResults");
const Espace = require("../models/espace.model");
const router = express.Router();

const reviewRouter = require("./review.route");

// re-route into other resource routers
router.use("/:espaceId/reviews", reviewRouter);

const { protect, authorize } = require("../middlewares/auth");
router
  .route("/")
  .get(advancedResults(Espace), getEspaces)
  .post(protect, authorize("owner", "admin"), createEspace);

router
  .route("/:_id")
  .get(getOneEspace)
  .put(protect, authorize("owner", "admin"), updateEspace)
  .delete(protect, authorize("owner", "admin"), deleteEspace);

module.exports = router;
