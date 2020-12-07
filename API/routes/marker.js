const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const Marker = require("../models/marker");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  // accept a file

  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    //reject a file
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: fileFilter,
});

router.get("/", (req, res) => {
  const userId = req.query.userId;
  const objectId = require("mongoose").Types.ObjectId;
  let getting;
  if (objectId.isValid(userId)) {
    getting = Marker.find({ userId: userId });
  } else {
    getting = Marker.find({ googleId: userId });
  }
  getting
    .exec()
    .then((docs) => {
      res
        .status(201)
        .contentType("json")
        .send({
          count: docs.length,
          markers: docs.map((doc) => {
            return {
              id: doc._id,
              title: doc.title,
              desc: doc.desc,
              rating: doc.rating,
              photo: doc.photo,
              startDate: doc.startDate,
              endDate: doc.endDate,
              longitude: doc.longitude,
              latitude: doc.latitude,
              createdAt: doc.createdAt,
              editedAt: doc.editedAt,
            };
          }),
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/add", upload.single("photo"), (req, res) => {
  const objectId = require("mongoose").Types.ObjectId;
  let marker;
  if (objectId.isValid(req.body.userId)) {
    marker = new Marker({
      title: req.body.title,
      desc: req.body.desc,
      rating: req.body.rating,
      // photo: req.file.path,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      userId: req.body.userId,
    });
  } else {
    marker = new Marker({
      title: req.body.title,
      desc: req.body.desc,
      rating: req.body.rating,
      // photo: req.file.path,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      googleId: req.body.userId,
    });
  }
  marker.photo.data = fs.readFileSync(req.file.path);
  marker.photo.contentType = "image/jpeg";
  marker
    .save()
    .then((result) => {
      res.status(201).json({
        message: "created",
        marker,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/delete", (req, res) => {
  Marker.findByIdAndDelete(req.body.markerId)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        errro: err,
      });
    });
});

router.get("/:id", (req, res) => {
  Marker.findById(req.params.id)
    .exec()
    .then((result) => {
      res.status(200).json({
        marker: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:id", (req, res) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Marker.updateOne({ _id: req.params.id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
