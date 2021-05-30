const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { usersCtrl } = require("../controllers");
const upload = require("../services/upload");

const auth = require("../configs/authorization");
const router = express.Router();

router.get("/verify/:verificationToken", usersCtrl.verify);

router.post("/verify", usersCtrl.repeatVerify);

router.post("/logout", auth, usersCtrl.logout);

router.get("/current", auth, usersCtrl.current);

router.post("/signup", express.json(), usersCtrl.signup);

router.post("/login", express.json(), usersCtrl.login);

router.patch(
  "/avatars",
  express.json(),
  auth,
  upload.single("avatar"),
  usersCtrl.avatars
);

module.exports = router;
