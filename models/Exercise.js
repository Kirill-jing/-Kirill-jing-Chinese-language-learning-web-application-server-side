const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
  },
  nameTr: {
    type: String,
  },
  pinin: {
    type: String,
  },
  example: {
    type: String,
  },
  exampleTr: {
    type: String,
  },
  examplePinin: {
    type: String,
  },
  image: {
    type: String,
    required: false,
  },
  audio: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
