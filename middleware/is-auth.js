const jwt = require("jsonwebtoken");
require("dotenv/config");
module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let key = process.env.JWT;
  let decToken;
  try {
    decToken = jwt.verify(token, key);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decToken) {
    res.status(401).json({
      message: "unauthorized",
    });
  }
  req.userId = decToken.id;
  next();
};
