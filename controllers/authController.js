const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const AppError = require("../utilis/appError.js");
const catchAsync = require("../utilis/catchAsync.js");

//TOKEN CREATION//
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user);

  // Controlla la validità di process.env.JWT_COOKIE_EXPIRES_IN
  const expiresIn = process.env.JWT_COOKIE_EXPIRES_IN || 7; // Valore predefinito di 7 giorni
  const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000);

  const cookieOptions = {
    expires: expiresAt,
    secure:true ,

    httpOnly: true,
    sameSite: "None",
    partitioned: true,
  };

  // Imposta il cookie JWT con le opzioni configurate
  res.cookie("jwt", token, cookieOptions);

  // Invia la risposta al client con lo stato e il token
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
/// USER ACTIONS
//
//  SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    photo: req.body.photo,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  createSendToken(newUser, 201, res);
});
//  LOGIN API
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) check if email and password exist
  if (!email || !password) {
    return next(new AppError("please provide email and password"), 400);
  }
  //2) check if user exists  & password exists
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or Password", 401));
  }
  //3) if everything is ok, send token
  createSendToken(user, 200, res);
});
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    secure:true ,

    httpOnly: true,
    sameSite: "None",
    partitioned: true,
  });
  res.status(200).json({ status: 'success' });
};
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.authorization);
  } //#TODO: UNDERSTAND
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  //così possiamo usarlo nei template
  res.locals.user = currentUser;

  next();
});
exports.isLoggedIn = async (req, res, next) => {
  // 1) Getting token and check of it's there
  if (req.cookies.jwt)
    try {
      {
        // 2) Verification token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET,
        );

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }

        // 4) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next();
        }

        // THERE IS A LOGGED IN USER, pug template can use user as variable
        res.locals.user = currentUser;

        return next();
      }
    } catch {
      return next();
    }
  next();
};
exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you are not authorized", 403));
    }
    next();
  };
};
