// app.js
// //REQUIREMENTS
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// Middleware per sicurezza e configurazione
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:7000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  helmet({
    contentSecurityPolicy:false, 
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(methodOverride("_method"));

// Middleware per la gestione delle richieste e la sicurezza
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//app.use(
//rateLimit({
//max: 100,
//windowMs: 60 * 60 * 1000,
//message: "Too many requests from this IP, please try again in an hour",
//  }),
//);
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());

// Middleware per la gestione delle risorse statiche e le route
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/articles", require("./routes/articleRouter.js"));
app.use("/api/v1/users", require("./routes/userRouter.js"));
app.use("/api/v1/comments", require("./routes/commentRouter.js"));
app.use(require("./routes/viewRoute"));

module.exports = app;
