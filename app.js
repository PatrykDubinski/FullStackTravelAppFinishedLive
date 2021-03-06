const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./API/routes/auth");
const markerRoutes = require("./API/routes/marker");

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_PW}@cluster0.lg3ju.mongodb.net/travelApp?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "apka/build")));

app.use("/auth", authRoutes);
app.use("/marker", markerRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/apka/build/index.html"));
});

module.exports = app;
