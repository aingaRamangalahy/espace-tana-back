const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Espace = require("../models/espace.model");

/**
 * @description get all espaces
 * @route GET /api/v1/espaces
 * @access public
 */
exports.getEspaces = asyncHandler(async (req, res, next) => {
  const espaces = await Espace.find();
  res.status(200).json({
    success: true,
    data: espaces,
  });
});

/**
 * @description get single espace
 * @route GET /api/v1/espaces/espaceID
 * @access public
 */
exports.getEspace = asyncHandler(async (req, res, next) => {
  const espace = await Espace.findById(req.params._id);

  if (!espace) {
    return next(
      new ErrorResponse(`Espace not found with the id of ${req.params._id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: espace,
  });
});

/**
 * @description create espace
 * @route POST /api/v1/espaces
 * @access private
 */
exports.createEspace = asyncHandler(async (req, res, next) => {
  const espace = await Espace.create(req.body);

  res.status(200).json({
    success: true,
    data: espace,
  });
});

/**
 * @description update espace
 * @route PUT /api/v1/espaces/espaceID
 * @access private
 */
exports.updateEspace = asyncHandler(async (req, res, next) => {
  let espace = await Espace.findById(req.params._id);

  if (!espace) {
    return next(
      new ErrorResponse(`Espace not found with the id of ${req.params._id}`, 404)
    );
  }

  espace = await Espace.findByIdAndUpdate(req.params._id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    data: espace,
  });
});

/**
 * @description delete espace
 * @route DELETE /api/v1/espaces/espaceID
 * @access private
 */
exports.deleteEspace = asyncHandler(async (req, res, next) => {
  const espace = await Espace.findById(req.params._id);

  if (!espace) {
    return next(
      new ErrorResponse(`Espace not found with the id of ${req.params._id}`, 404)
    );
  }

  await Espace.findByIdAndDelete(req.params._id);

  res.status(200).json({
    success: true,
    data: espace,
  });
});
