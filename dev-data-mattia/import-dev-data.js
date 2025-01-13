
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });
dotenv.config({path: './config.env'}); 
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
	  useUnifiedTopology:true
  })
  .then((con) => {
    console.log("DB CONNECTED");
  });
