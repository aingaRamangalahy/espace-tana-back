const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Espace = require("../models/espace.model");
const Review = require("../models/review.model");

//  @desc       Get reviews
//  @route      GET /api/v1/reviews
//  @route      GET /api/v1/espaces/:espaceId/reviews
//  @access     Public

exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.espaceId) {
    const reviews = await Review.find({
      espace: req.params.espaceId,
    });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//  @desc       Get single review
//  @route      GET /api/v1/reviews/:id
//  @access     Public

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "espace",
    select: "name description",
  });

  if (!review) {
    return next(
      new ErrorResponse(`No roview found with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: review,
  });
});

//  @desc       Add review
//  @route      POST /api/v1/espace/:espaceId/reviews
//  @access     Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.espace = req.params.espaceId;
  req.body.user = req.user.id;

  const espace = await Espace.findById(req.params.espaceId);

  if (!espace) {
    return next(
      new ErrorResponse(
        `No espace with the id of ${req.params.espaceId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

//  @desc       update review
//  @route      PUT /api/v1/reviews/:id
//  @access     Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized user`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

//  @desc       delete review
//  @route      DELETE /api/v1/reviews/:id
//  @access     Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized user`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
