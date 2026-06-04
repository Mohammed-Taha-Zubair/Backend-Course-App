const { Router } = require("express");
const { userModel } = require("../db");
const { userJwtPassword } = require("../config");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middleware/user");

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  await userModel.create({
    email,
    password,
    firstName,
    lastName,
  });
  res.json({
    message: "signup succeeded",
  });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email, password: password });

  if (user) {
    const token = jwt.sign({ id: user._id }, userJwtPassword);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const purchases = await courseModel.find({
    userId: userId,
  });
  res.json({
    message: "Your courses/purchases",
    purchases,
  });
});

module.exports = {
  userRouter: userRouter,
};
