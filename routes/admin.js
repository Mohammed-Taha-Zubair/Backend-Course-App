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

//create a course
adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
  });
});
//update a course
adminRouter.put("/course/update", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const { courseId, title, description, imageUrl, price } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      description,
      imageUrl,
      price,
    },
  );

  res.json({
    message: "Course updated",
    courseId,
  });
});

adminRouter.get("/courses/all", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "Courses",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
