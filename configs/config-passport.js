const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require("dotenv");
dotenv.config();

const { User } = require("../model");

const { ExtractJwt } = passportJWT;
const { Strategy } = passportJWT;

const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    console.log("try find error 1"); //поиск ошибки

    try {
      console.log("try find error 2"); //поиск ошибки
      const user = await User.findOne({ _id: payload.id });
      done(null, user);
    } catch (error) {
      console.log("try find error 3"); //поиск ошибки
      done(error);
    }
  })
);
