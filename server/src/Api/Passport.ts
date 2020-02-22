import LocalStrategy from "passport-local";
import passport from "passport";
import { User } from "../models/User";

const LocalStrategy = require("passport-local").Strategy;

const Passport = () => {
  const LS = LocalStrategy.Strategy;
  const local = new LS((username, password, done) => {
    User.findOne({ username })
      .then(user => {
        if (!user || !user.validPassword(password)) {
          done(null, false, { message: "Invalid username/password" });
        } else {
          done(null, user);
        }
      })
      .catch(e => done(e));
  });
  passport.use("local", local);

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(userId, done) {
    User.findById(userId, (err, user) => done(err, user));
  });
  return passport;
};

export default Passport();
