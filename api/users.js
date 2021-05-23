const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { usersCtrl } = require("../controllers");
const auth = require("../configs/authorization");
const router = express.Router();

router.post("/logout", auth, usersCtrl.logout);

router.get("/current", auth, usersCtrl.current);

router.post("/signup", express.json(), usersCtrl.signup);

router.post("/login", express.json(), usersCtrl.login);

module.exports = router;
