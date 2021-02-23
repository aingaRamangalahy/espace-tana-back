const express = require("express");
const Review = require("../models/review.model");
const router = express.Router({ mergeParams: true });

const advancedResults = require("../middlewares/advancedResults");
const {
  getReviews,
  addReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

router
  .route("/")
  .get(
    advancedResults(Review, { path: "espace", select: "name description" }),
    getReviews
  )
  .post(addReview); // to protect

router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

module.exports = router;