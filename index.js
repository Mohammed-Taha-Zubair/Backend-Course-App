const express = require("express");
const { userRouter } = require("./user");
const { courseRouter } = require("./course");
const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(3000, () => {
  console.log("Listening at Port: 3000");
});
