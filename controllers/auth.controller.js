const asyncHandler = require("../middlewares/asyncHandler");
const ErrorHangler = require("../middlewares/errorHanlder");
const User = require("../models/user.model");

/**
 * @description register
 * @route POST /api/v1/users/registe
 * @access public
 */
exports.regiter = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getSignedJwtToken();

  user.conneted = true;
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});

/**
 * @description login
 * @route POST /api/v1/users/login
 * @access public
 */
exports.regiter = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse(`Cet email n'existe pas encore`, 404));
  }
});

/**
 * @description logout
 * @route POST /api/v1/users/logout
 * @access public
 */
exports.regiter = asyncHandler(async (req, res, next) => {});

/**
 * @description forgot password
 * @route POST /api/v1/users/forgotpassword
 * @access public
 */

/**
 * @description reset password
 * @route POST /api/v1/users/resetpassword
 * @access private
 */
