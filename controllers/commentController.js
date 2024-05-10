

const Comments = require("./../models/commentModel");
const factory = require("./handlerFactory");
const AppError = require("../utilis/appError");
const APIFeatures = require(`./../utilis/apiFeatures`);
const catchAsync = require("./../utilis/catchAsync");

exports.getAllComments = factory.getAll(Comments);
