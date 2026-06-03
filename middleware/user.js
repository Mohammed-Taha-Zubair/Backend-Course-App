const jwt = require("jsonwebtoken");
const { userJwtPassword } = require("../config");

const userMiddleware = async (req, res, next) => {
  const token = req.headers.token;
  const decoded = jwt.verify(token, userJwtPassword);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in",
    });
  }
};

module.exports = {
  userMiddleware:userMiddleware,
};
