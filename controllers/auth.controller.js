const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @description register
 * @route POST /api/v1/auth/register
 * @access public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { email, firstName, password } = req.body;

  if (!email || !firstName || !password) {
    return next(
      new ErrorResponse(`Veuillez remplir les champs obligatoires`, 400)
    );
  }

  // check if email adresse is already  used
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(
      new ErrorResponse(`Cet email est déjà utilisé pour un autre compte`, 400)
    );
  }

  // create the user and send token
  const user = await User.create(req.body);
  const token = await user.getSignedJwtToken();

  user.connected = true;
  await user.save();

  const { _id, lastName, role, connected } = user;

  res.status(200).json({
    success: true,
    data: {
      _id,
      firstName,
      lastName,
      role,
      connected,
    },
    token,
  });
});

/**
 * @description login
 * @route POST /api/v1/auth/login
 * @access public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // user validation
  if (!email || !password) {
    return next(new ErrorResponse(`Identifiants invalides`, 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Identifiants invalides`, 404));
  }

  const isPasswordMatching = await user.comparePassword(password);
  if (!isPasswordMatching) {
    return next(new ErrorResponse(`Identifiants invalides`, 401));
  }

  if (user.connected) {
    return next(new ErrorResponse(`Utilisateur déjà connecté`, 400));
  }

  // create token
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // set user to connected
  user.connected = true;
  await user.save();

  const { _id, firstName, lastName, role, connected } = user;
  res.status(200).json({
    success: true,
    data: {
      _id,
      firstName,
      lastName,
      role,
      connected,
    },
    accessToken,
    refreshToken,
  });
});

/**
 * @description logout
 * @route POST /api/v1/auth/logout
 * @access private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse(`Utilisateur non reconnu`, 404));
  }

  user.connected = false;
  user.save();

  res.status(200).json({
    success: true,
    message: "Utilisateur déconnecté",
  });
});

/**
 * @description forgot password
 * @route POST /api/v1/auth/forgotpassword
 * @access public
 */
exports.forgotPassword = asyncHandler(async () => {});

/**
 * @description reset password
 * @route POST /api/v1/users/resetpassword
 * @access private
 */
exports.resetPassword = asyncHandler(async () => {});
