const { Router } = require("express");

const { adminModel } = require("../db");
const adminRouter = Router();

const jwt = require("jsonwebtoken");
const adminPassword = "admin1221";

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  await adminModel.create({
    email,
    password,
    firstName,
    lastName,
  });
  res.json({
    message: "signup succeeded",
  });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email: email, password: password });

  if (admin) {
    const token = jwt.sign({ id: admin._id }, adminPassword);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/course", async (req, res) => {
  res.json({
    message: "Add a course",
  });
});

adminRouter.put("/course", async (req, res) => {
  res.json({
    message: "signin endpoint",
  });
});

adminRouter.get("/course", async (req, res) => {
  res.json({
    message: "See ur courses",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
