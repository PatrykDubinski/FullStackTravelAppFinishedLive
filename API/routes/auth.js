const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/auth");

router.post("/register", (req, res) => {
  User.find({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(401).json({
          message: "Email already in use",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash,
              nickname: req.body.nickname,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                  user: result,
                });
              })
              .catch((err) => {
                console.log(err.errors);
                res.status(500).json({
                  error: err,
                  message: err.message,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Wrong email or password",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Wrong email or password",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          const decoded = jwt.decode(token);
          return res.status(200).json({
            message: "Login succesfull",
            token: token,
            userId: user[0]._id,
            userEmail: user[0].email,
            expiration: decoded.exp,
          });
        }
        res.status(401).json({
          message: "Wrong email or password",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/google", (req, res) => {
  User.find({ userId: req.body.userId })
    .exec()
    .then((users) => {
      if (users.length == 0) {
        const user = new User({
          email: req.body.email,
          nickname: req.body.nickname,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userId: req.body.userId,
          picture: req.body.picture,
        });
        user
          .save()
          .then((result) => {
            res.status(201).json({
              message: "created",
              user: user,
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/getData/:id", (req, res) => {
  User.findById(req.params.id)
    .exec()
    .then((response) => {
      res.status(200).json({
        user: {
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          nickname: response.nickname,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
