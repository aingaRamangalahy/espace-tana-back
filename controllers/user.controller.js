const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @description get all users
 * @route GET /api/v1/users
 * @access private
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
    count: users.length,
  });
});

/**
 * @description get single user
 * @route POST /api/v1/users
 * @access private
 */
exports.getOneUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params._id);

  if (!user) {
    return next(new ErrorResponse(`Utilisateur non trouvé`, 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc Update user
 * @route PUT /api/v1/users/:_id
 * @access Private Admin
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc Delete user
 * @route DELETE /api/v1/users/:_id
 * @access Private Admin
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params._id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
