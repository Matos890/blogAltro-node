const Articles = require("./../models/articleModel");
const factory = require("./handlerFactory");
const AppError = require("../utilis/appError");
const APIFeatures = require(`./../utilis/apiFeatures`);
const catchAsync = require("./../utilis/catchAsync");

exports.getAllArticles = factory.getAll(Articles);
exports.createArticle = factory.createOne(Articles);
exports.deleteArticle = factory.deleteOne(Articles)

exports.updateArticle = factory.updateOne(Articles);