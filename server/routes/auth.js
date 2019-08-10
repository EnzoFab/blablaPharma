const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

/*
Handle every authentication routes
 */

router.post("/login", (req, res, next) => {
  // todo maybe use passport
  const user = {
    name: "User test"
  };
  const accessToken = jwt.sign(user, process.env.JWT_SECRET);
  res.cookie("accessToken", accessToken);
  res.cookie("userData", JSON.stringify(user));
  res.send({ accessToken, user });
});

router.post("/register", (req, res, next) => {});

module.exports = router;
