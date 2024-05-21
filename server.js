const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });
const DB = process.env.DATABASE;
const axios = require('axios')
const methodOverride= require('method-override')
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

const port = 7000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
}) 
;

 


