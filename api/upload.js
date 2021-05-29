const express = require("express");
const upload = require("../services/upload");
// const auth = require("../configs/authorization");

const router = express.Router();

router.post(
  "/",
  express.json(),
  upload.single("avatar"),
  async (req, res, next) => {
    console.log(req.file);
  }
);

module.exports = router;
