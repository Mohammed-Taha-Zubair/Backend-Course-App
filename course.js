const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", async (req, res) => {
  res.json({
    message: "Buy a course",
  });
});

courseRouter.get("/preview", async (req, res) => {
  res.json({
    message: "Preview the course",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
