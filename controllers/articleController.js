const Articles = require("./../models/articleModel");
const factory = require("./handlerFactory");
const AppError = require("../utilis/appError");
const APIFeatures = require(`./../utilis/apiFeatures`);
const catchAsync = require("./../utilis/catchAsync");

exports.getAllArticles = factory.getAll(Articles);
exports.createArticle = factory.createOne(Articles);
exports.deleteArticle = factory.deleteOne(Articles)

exports.updateArticles = factory.updateOne(Articles);
exports.updateArticle =  catchAsync(async (req, res, next) => {
  const article = await Articles.findOne({ slug: req.params.slug });

  if (!article) {
    return next(new Error("Articolo non trovato."));
  }

  article.imageCover = req.body.imageCover;
  article.title = req.body.title;
  article.category = req.body.category;
  article.article = req.body.article;

  const updatedArticle = await article.save();

    res.status(200).json({
      status: 'success',
      data: {
        updatedArticle
      },
    });
});


