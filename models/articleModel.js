const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const slug = require("slugify");
const {marked} = require(
	 "marked"
)
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [40, "a title must have less or equale than 40 characters"],
      minlength: [1, "a title must have at least one character"],
      required: true,
    },
    slug: String,
    summary: { type: String, trim: true },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: [String],
    article: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["literature", "politics", "culture", "technology"],
      required: true,
    },
    sanitizedHtml: {
      type: String,
      required: true,
    },
  }, 
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
articleSchema.pre("validate", function (next) {
  if (this.isModified("title")) { // Controlla se il titolo è stato modificato
    if (this.title) {
      this.slug = slugify(this.title, { lower: true });
    }
  }
  
  // Aggiorna il sanitizedHtml solo se l'articolo è stato modificato
  if (this.isModified("article")) {
    if (this.article) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.article));
    }
  }
  
  next();
});
const Articles = mongoose.model("Articles", articleSchema);
module.exports = Articles;
