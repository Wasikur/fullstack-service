const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized HTTP, Token not provided" });
  }
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token from auth middleware", jwtToken);

  //   Verifyng token
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    res.status(401).send({ message: " Unauthorized invalid token" });
  }
};
module.exports = authMiddleware;
