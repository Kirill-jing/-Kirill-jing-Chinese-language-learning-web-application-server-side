const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  console.log(token);
  let decToken;
  try {
    decToken = jwt.verify(token, "secretKey");
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
