const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/send", (req, res) => {
  const key = process.env.LINK_PREVIEW_APIKEY;

  axios
    .get("https://api.linkpreview.net", {
      params: {
        q:
          "https://blog.kiprosh.com/using-url-previews-in-your-web-apps-using-javascript/",
        key
      }
    })
    .then(result => {
      res.send(result.data);
    })
    .catch(e => {
      res.send(e.response.data);
    });
  //res.send("string");
});
module.exports = router;
