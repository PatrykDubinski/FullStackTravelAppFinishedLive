const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Your email doesn't looks like email",
    ],
  },
  password: {
    type: String,
    // required: [true, "Password cannot be blank"],
    // min: [8, "Password must have at least 8 characters"],
  },
  nickname: {
    type: String,
    required: [true, "Nickname cannot be blank"],
  },
  firstName: {
    type: String,
    required: [true, "First name cannot be blank"],
  },
  lastName: {
    type: String,
    required: [true, "Last name cannot be blank"],
  },
  userId: {
    type: String,
  },
  picture: {
    type: String,
  },
  markers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marker",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
