const Articles = require("./../models/articleModel");
const factory = require("./handlerFactory");
const AppError = require("../utilis/appError");
const APIFeatures = require(`./../utilis/apiFeatures`);
const catchAsync = require("./../utilis/catchAsync");
const sharp = require("sharp");
const multer = require("multer");

/////////////////////////////////////////////////////////
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image, Please upload only images", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadArticleImage = upload.single("imageCover");
exports.resizeArticlePhoto = async (req, res, next) => {
  if (!req.file) {
    console.log(`non c'è`);
    return next();
  }
  req.file.filename = `articleImage-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.file.filename}`);
    
  next();
};
exports.getAllArticles = factory.getAll(Articles);
exports.createArticle = 
  catchAsync(async (req, res) => {
    // console.log(req.body);
    const article = await Articles.create(req.body);
  article.imageCover = req.file.filename;
  article.title = req.body.title;
  article.subheading = req.body.subheading;
  article.authorName = req.body.authorName;
  article.imageCaption = req.body.imageCaption;
  article.category = req.body.category;
  article.article = req.body.article;

  const newArticle = await article.save();
    res
      .status(201)
      .set(
        "Content-Security-Policy",
        "connect-src 'self' https://cdnjs.cloudflare.com",
      )
      .json({
        status: "success",
        data: {
        newArticle,
        },
      });
  });
exports.deleteArticle = factory.deleteOne(Articles);

exports.updateArticles = factory.updateOne(Articles);
exports.updateArticle = catchAsync(async (req, res, next) => {
  const article = await Articles.findOne({ slug: req.params.slug });

  if (!article) {
    return next(new Error("Articolo non trovato."));
  }

  article.imageCover = req.file.filename;
  article.title = req.body.title;
  article.subheading = req.body.subheading;
  article.authorName = req.body.authorName;
  article.imageCaption = req.body.imageCaption;
  article.category = req.body.category;
  article.article = req.body.article;

  const updatedArticle = await article.save();

  res.status(200).json({
    status: "success",
    data: {
      updatedArticle,
    },
  });
});
