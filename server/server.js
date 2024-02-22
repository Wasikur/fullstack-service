require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db.js");

const app = express();

//Front-end routes
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router.js");
const serviceRoute = require("./router/service-router.js");

//Admin route
const adminRoute = require("./router/admin-router.js");

const errorMiddleware = require("./middlewares/error-middleware.js");

// Handling cors
const corsOptions = {
  origin: "https://fullstack-service-client.vercel.app",
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.json({ message: "Server is Up" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Authentication api route
app.use("/api/auth", authRoute);

// Contact and Services api routes
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// Admin api route
app.use("/api/admin", adminRoute);

// Using error detection middleware for exact problem
app.use(errorMiddleware);

const PORT = process.env.PORT;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
