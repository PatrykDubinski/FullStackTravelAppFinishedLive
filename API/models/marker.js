const mongoose = require("mongoose");

const markerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 20,
    },
    city: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
      max: 150,
    },
    rating: {
      type: Number,
      required: true,
    },
    googleId: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    userId: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
  },
  {
    timestamps: true,
  }
);

const MarkerLog = mongoose.model("Marker", markerSchema);

module.exports = MarkerLog;
