const Articles = require("../models/articleModel");
const Users = require("../models/userModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utilis/catchAsync.js");
const AppError = require("../utilis/appError.js");
const { default: slugify } = require("slugify");

// ARTICLES PAGES
exports.getOverview = catchAsync(async (req, res) => {
  const articles = await Articles.find();
  res.status(200).render("homepage", {
    title: "Homepage",
    articles,
  });
  console.log(res.data)
});
exports.getArticle = catchAsync(async (req, res, next) => {
  const article = await Articles.findOne({ slug: req.params.slug });
  if (!article) {
    return next(new AppError("there is no such article with that name"), 404);
  }
  res.status(200).render("article", {
    title: article.title,
    article,
  });
});
exports.newArticle = (req, res) => {
  res.render("newArticle", { article: new Articles() });
};
//exports.submitNewArticle = catchAsync(async (req, res) => {
  //const article = await Articles.create(req.body);
  //res.status(200).redirect("/");
//});
exports.getEditPage = catchAsync(async (req, res, next) => {
  const article = await Articles.findOne({ slug: req.params.slug });
  if (!article) {
    return next(new AppError("no file"), 400);
  }
  res.status(200).render("editArticle", {
    title: article.title,
    article,
  });
});
exports.deleteArticle = factory.deleteOne(Articles);
exports.editArticle = catchAsync(async (req, res, next) => {
  const article = await Articles.findOne({ slug: req.params.slug });

  if (!article) {
    return next(new Error("Articolo non trovato."));
  }

  article.imageCover = req.body.imageCover;
  article.title = req.body.title;
  article.category = req.body.category;
  article.article = req.body.article;

  const updatedArticle = await article.save();

  res
    .status(200)
    .redirect(`/articles/${updatedArticle.category}/${updatedArticle.slug}`);
});

//VIEW USER PAGES

exports.viewSignUpPage = catchAsync(async (req, res) => {
  res.status(200).render("signUp", { newUser: new Users() });
});
// VIEW LOGIN PAGE
exports.viewLoginPage = catchAsync(async(req,res) =>{
	res.status(200).render('login', {
		title:'log in to your account'
	})
})
