import LocalStrategy from 'passport-local';
import passport from 'passport';
import { User } from '../schemas/User';

// const LocalStrategy = require('passport-local').Strategy;

const Passport = () => {
  const LS = LocalStrategy.Strategy;
  const local = new LS((username: any, password: any, done: any) => {
    User.findOne({ username })
      .then((user) => {
        if (!user || !user.validPassword(password)) {
          done(null, false, { message: 'Invalid username/password' });
        } else {
          done(null, user);
        }
      })
      .catch((e) => done(e));
  });
  passport.use('local', local);

  passport.serializeUser((user: any, done) => {
    // eslint-disable-next-line no-underscore-dangle
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => done(err, user));
  });
  return passport;
};

export default Passport();
