// app.js
// //REQUIREMENTS
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const helmet = require('helmet')
app.use(methodOverride("_method"));
const hpp = require("hpp");
const morgan = require("morgan");
const xss = require('xss-clean')
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require('express-rate-limit');
const viewRoute = require("./routes/viewRoute");
const articleRouter = require("./routes/articleRouter.js");
const userRouter = require("./routes/userRouter.js");
const commentRouter = require("./routes/commentRouter.js");
const cors = require('cors')
//    APPLICATION USE

app.use(express.static(`${__dirname}/public`));
app.use(hpp());
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
//
const scriptSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://*.cloudflare.com/',
  'https://cdnjs.cloudflare.com/ajax/libs/axios/',
  'https://*.stripe.com',
  'https:',
  'data:',
];
const styleSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://fonts.googleapis.com/',
  'https:',
];
const connectSrcUrls = [
  'https://unpkg.com',
  'https://tile.openstreetmap.org',
  'https://*.cloudflare.com/',
  'http://127.0.0.1:3000',
];
const fontSrcUrls = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'https:',
  'data:',
];
const frameSrcUrls = ['https://*.stripe.com'];

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
//development login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

app.use(mongoSanitize());
//data sanitization against cross script
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'difficulty',
      'price',
      'maxGroupSize',
      'ratingsAverage',
    ],
  })
);
//grant use of parameters from the request
app.use(express.urlencoded({ extended: true, limit: "10kb" }));



//     PUG ENABLEMENT
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
//ROUTES API
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentRouter);
// VIEW ROUTE
app.use("/", viewRoute);

//always export
module.exports = app;


