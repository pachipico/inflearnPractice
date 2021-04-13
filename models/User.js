const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: "string",
    maxLength: 50,
  },
  email: {
    type: "string",
    trim: true,
    unique: 1,
  },
  lastName: {
    type: "string",
    maxLength: 50,
  },
  role: {
    type: "number",
    default: 0,
  },
  image: String,
  token: {
    type: "string",
  },
  tokenEXP: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
