const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    mongoose
      .connect(URI)
      .then(() => console.log("Connected to Mongo Database"));
  } catch (error) {
    console.error("Mongo Database connection error", error);
    process.exit(0);
  }
};

module.exports = connectDb;
