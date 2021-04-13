const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

const port = 3000;
const url =
  "mongodb+srv://jimmy:test1234@cluster0.gy7x9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("mongodb Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server started on port 3000.");
});
