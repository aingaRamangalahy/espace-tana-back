const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user.model");
const config = require("../config/index")

// protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
      token = req.headers.authorization.split(" ")[1];
  }

  if(!token) {
      return next(
          new ErrorResponse("Vous n'avez pas accès à cette ressource", 401)
      )
  }

  try {
     const decoded = jwt.verify(token, config.SECRET_TOKEN);
     req.user = await User.findById(docoded.id) 
  } catch (error) {
    return next(
        new ErrorResponse("Vous n'avez pas accès à cette ressource", 401)
    )
  }
});


// authorize access
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    ` Votre role ne vous permet pas d'acceder à cette ressource`, 403
                )
            )
        }
        next();
    }
}
