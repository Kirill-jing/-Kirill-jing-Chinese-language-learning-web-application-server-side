const mongoose = require("mongoose");
const { schema } = require("./Exercise");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  yourwords: [],
});

module.exports = mongoose.model("User", userSchema);
