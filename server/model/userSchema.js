const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// Hashing the password
// userSchema.pre("save", async function (next) {
//   // console.log("pre method", this);
//   const user = this;
//   if (!user.isModified("password")) {
//     next();
//   }

//   try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, saltRound);
//     user.password = hashedPassword;
//     // console.log("pre method", this);
//   } catch (error) {
//     next(error);
//   }
// });

// Comparing the password
// userSchema.methods.comparePassword = async function (password) {
//   try {
//     return bcrypt.compare(password, this.password);
//   } catch (error) {
//     console.error("Password compare error", error);
//   }
// };

// json web token
userSchema.methods.generateAuthToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Token error", error);
  }
};

// Defining the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
