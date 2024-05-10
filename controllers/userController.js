const Users = require("./../models/userModel");
const factory = require("./handlerFactory");
const AppError = require("../utilis/appError");
const APIFeatures = require(`./../utilis/apiFeatures`);
const catchAsync = require("./../utilis/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = factory.getAll(Users);
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Crea un errore se l'utente invia dati sulla password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400,
      ),
    );
  }

  // Filtra gli oggetti che non sono consentiti essere modificati
  const filteredBody = filterObj(req.body, "name", "email");
  // Aggiorna l'utente
  const updatedUser = await Users.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await Users.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
