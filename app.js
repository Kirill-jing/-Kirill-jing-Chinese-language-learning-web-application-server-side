const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/auth-route");
const app = express();
const multer = require("multer");
const path = require("path");
const { ok } = require("assert");
require("dotenv/config");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE,PUT");
  next();
});

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/audios", express.static(path.join(__dirname, "audios")));
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB}:${process.env.DB_PASSWORD}@cluster0-sj8wi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 5004);
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });
