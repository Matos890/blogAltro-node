const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const slug = require("slugify");

const commentSchema = new mongoose.Schema(
  {
	  user:{
		  type:String,
		  required:[true, 'a user must have a name!']
	  } 
	  
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
commentSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;

