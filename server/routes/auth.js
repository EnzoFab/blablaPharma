const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const moment = require("moment");

/*
Handle every authentication routes
 */

router.post("/login", (req, res, next) => {
  // todo maybe use passport
  const user = {
    userId: "superId",
    userMail: "a@b.c",
    firstName: "Max",
    lastName: "Ime",
    gender: "male",
    professionalId: "bpdRPPS",
    profession: "Pharmacist",
    city: "Montpellier",
    postalCode: 33000,
    address: "18, rue de nulle part",
    institutionName: "White house",
    birthdayDate: moment()
      .subtract(22, "years")
      .format(),
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg"
  };
  const accessToken = jwt.sign(user, "secret");
  res.cookie("accessToken", accessToken);
  res.cookie("userData", JSON.stringify(user));
  res.send({ accessToken, user });
});

router.post("/register", (req, res, next) => {});

router.get("/test", (req, res) => res.send("ok"));

module.exports = router;
