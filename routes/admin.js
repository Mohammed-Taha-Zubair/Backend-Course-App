const { Router } = require("express");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

adminRouter.post("/signin", async (req, res) => {
  res.json({
    message: "signin endpoint",
  });
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
