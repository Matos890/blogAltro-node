// app.js
// //REQUIREMENTS
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

app.use(methodOverride("_method"));
const hpp = require("hpp");
const morgan = require("morgan");
const viewRoute = require("./routes/viewRoute");
const articleRouter = require("./routes/articleRouter.js");
const userRouter = require("./routes/userRouter.js");
const commentRouter = require("./routes/commentRouter.js");
//    APPLICATION USE
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
//grant use of parameters from the request
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(`${__dirname}/public`));



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
