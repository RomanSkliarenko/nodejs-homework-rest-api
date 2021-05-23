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
    const newUser = await User.findById(payload.id);
    if (newUser && newUser.token) {
      return done(null, newUser);
    } else {
      return done(null, false);
    }
  })
);
