const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
  type: {
    type: String,
  },
  image: {
    type: String,
    required: false,
  },
  audio: {
    type: String,
  },
  nameType: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
