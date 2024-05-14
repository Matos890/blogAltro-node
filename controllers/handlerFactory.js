const APIFeatures = require("../utilis/apiFeatures");
const AppError = require("../utilis/appError");
const catchAsync = require("../utilis/catchAsync");
exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    let filter = {};
    if (req.params.tourid) filter = { tour: req.params.tourid };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    //you can add down .explain() to see how many queries it does
    const doc = await features.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    // console.log(req.body);
    const doc = await Model.create(req.body);
    res.status(201).set('Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com",).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
//TODO: BISOGNA CREDO METTERE UN ID INVECE DI CATEGORY E SLUG
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({
      category: req.params.category,
      slug: req.params.slug,
    });
    const apiDoc = await Model.findByIdAndDelete(req.params.id);
    if (!doc && !apiDoc) {
      return next(new AppError("there is no such article"), 400);
    }
	  if (doc)  res.status(204).redirect("/")
	  else res.status(204).json({
		  status:"success",
		  data: apiDoc
	  })
		  
    
  });
