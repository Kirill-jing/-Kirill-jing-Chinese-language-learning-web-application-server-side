const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(409).json({
        message: "user already exists",
      });
    }
  });
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        username: username,
        email: email,
        password: hashedPw,
      });
      return user.save();
    })
    .then((result) => {
      const token = jwt.sign(
        { email: result.email, id: result._id.toString() },
        process.env.JWT,
        { expiresIn: "10h" }
      );
      res.status(201).json({ token: token, userId: result._id });
    })
    .catch((err) => console.log(err));
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "no user found",
        });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      console.log(isEqual);
      if (isEqual == false) {
        return res.status(401).json({
          alert: "wrong password",
        });
      }
      const token = jwt.sign(
        { username: loadedUser.username, id: loadedUser._id.toString() },
        process.env.JWT,
        { expiresIn: "10h" }
      );
      res.status(200).json({
        token: token,
        id: loadedUser._id.toString(),
      });
    })
    .catch((err) => console.log(err));
};
