const express = require("express");
// const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

const { User } = require("../model/index");

const auth = (req, res, next) => {
  console.log("тут запрос еще выполняется"); //поиск ошибки
  passport.authenticate("jwt", { session: false }, (err, user) => {
    console.log("тут уже не выполняется"); //поиск ошибки

    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "You have no provileg",
      });
    }
    req.user = user;
    next();
  });
};
router.get("/", auth, async (req, res, next) => {
  // роут для тестирования auth
  console.log("try find error 4"); //поиск ошибки
  return res.status(409).json({
    message: "try find error",
  });
});

router.post("/signup", express.json(), async (req, res, next) => {
  const { login, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ login, email });
    newUser.setPassword(password);
    const result = await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", express.json(), async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET);
  await User.updateOne({ _id: user._id }, { token }, { upsert: true });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user,
    },
  });
});

module.exports = router;
