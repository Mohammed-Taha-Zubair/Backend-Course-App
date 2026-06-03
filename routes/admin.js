const { Router } = require("express");
const { adminJwtPassword } = require("../config");
const { adminModel, courseModel } = require("../db");
const adminRouter = Router();

const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");

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
    const token = jwt.sign({ id: admin._id }, adminJwtPassword);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId :course._id
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
