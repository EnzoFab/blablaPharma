const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

/*
Handle every authentication routes
 */

router.post("/login", (req, res, next) => {
  // todo maybe use passport

  const accessToken = jwt.sign(
    {
      name: "User test"
    },
    process.env.JWT_SECRET
  );

  res.status(400).send({ accessToken });
});

router.post("/register", (req, res, next) => {});

module.exports = router;
