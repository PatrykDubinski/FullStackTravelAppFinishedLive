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
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "client/build")));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header(
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, multipart/form-data, Access-Control-Allow-Origin"
//   );
//   if (req.method == "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/auth", authRoutes);
app.use("/marker", markerRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

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
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = app;
