const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");

// Home Logic
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to home");
  } catch (error) {
    console.log(error);
  }
};

// Registration Logic
const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExists = await User.findOne({ email: email });

    //Checking if email is already registered
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hashing the password
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Creating new user if email does not exists
    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      createdAt: Date.now(),
    });
    res.status(201).json({
      // msg: userCreated,
      message: "Registration successful",
      token: await userCreated.generateAuthToken(),
      userId: userCreated._id.toString(),
    });
    console.log(`New User ${req.body.username} created`);
  } catch (error) {
    // res.status(500).send({ message: "Internal server error" });
    next(error);
  }
};

// Login Logic
const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });

    //Checking if email is registered
    if (!userExists) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // If user exists then compare password
    const user = await bcrypt.compare(password, userExists.password);

    if (user) {
      res.status(200).json({
        // msg: userCreated,
        message: "Login successful",
        token: await userExists.generateAuthToken(),
        userId: userExists._id.toString(),
      });
      console.log(`User ${userExists.username} Loggedin`);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

// User Logic: To send user data
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error from the user router ${error}`);
  }
};

module.exports = { home, register, login, user };
