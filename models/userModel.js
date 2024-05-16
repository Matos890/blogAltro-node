const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

///////////////            ///////////////
/////////////////////// USER MODEL ///////////////////////
//////////////            ///////////////
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name!"],
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "writer"],
      default: "user",
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "A user must provide a password"],
      minlenght: 8,
      select: false,
    },
    passwordChangedAt: Date,
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    passwordResetToken: String,
    passwordResetExpire: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

///////////////              ///////////////
/////////////////////// USER SCHEMAS ///////////////////////
//////////////              ///////////////

userSchema.pre("save", async function (next) {
  //run if password modified
  if (!this.isModified("password")) return next();
  // hash with cost f 12
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10,
    );
    console.log(changedTimeStamp, JWTTimestamp);
    //password changed!
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log("ciao", { resetToken }, this.passwordResetToken);
  // Difference between your current time and UTC + 10min

  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
