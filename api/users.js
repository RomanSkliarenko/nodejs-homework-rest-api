const express = require("express");
// const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../model/index");

//=====================================//
// const passport = require("passport");
const passportJWT = require("passport-jwt");
// const dotenv = require("dotenv");
// dotenv.config();

// const { User } = require("../model");

const { ExtractJwt } = passportJWT;
const { Strategy } = passportJWT;

const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// passport.use(
//   new Strategy(params, async (payload, done) => {
//     console.log("try find error 1"); //поиск ошибки

//     try {
//       console.log("try find error 2"); //поиск ошибки
//       const user = await User.findOne({ _id: payload.id });
//       done(null, user);
//     } catch (error) {
//       console.log("try find error 3"); //поиск ошибки
//       done(error);
//     }
//   })
// );
//==========================================
passport.use(
  new Strategy(params, async (jwt_payload, done) => {
    // console.log(jwt_payload.id);
    const newUser = await User.findById(jwt_payload.id);
    if (newUser) {
      return done(null, newUser);
    } else {
      return done(null, false);
      // or you could create a new account
    }
    console.log(newUser);
  })
);
//====================================

const router = express.Router();
// require("../configs/config-passport");

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
//======================================
router.post(
  "/profile",
  express.json(),
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send(req.user);
  }
);
//=====================================
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
  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      newUser,
    },
  });
});

module.exports = router;
