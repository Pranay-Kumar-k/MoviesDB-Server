// creating a model for user

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique:true,
        minLength:10
      },
    password: {
        type: String,
        required: true,
        minLength: 6,
      },
},{timestamps:true}, {versionKey:false})

// Hashing the password to hide it
userSchema.pre("save", function(next) {
  if(!this.isModified("password")) {
    return next();
  }
  else {
    bcrypt.hash(this.password, 6, (err,hash) => {
      if(err) {
        return next(err);
      }
      this.password = hash;
      next();
    })
  }
});

module.exports = mongoose.model("user", userSchema);