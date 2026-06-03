const jwt = require("jsonwebtoken");
const { adminJwtPassword } = require("../config");

const adminMiddleware = async (req, res, next) => {
  const token = req.headers.token;
  const decoded = jwt.verify(token, adminJwtPassword);
  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in",
    });
  }
};

module.exports = {
  adminMiddleware: adminMiddleware,
};
