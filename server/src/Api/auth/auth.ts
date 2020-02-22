import { User } from '../../schemas/User';
import chalk from 'chalk';
import { getUserData } from '../../utils/getUserData';

const AuthApi = (app: any, passport: any) => {
  app.post('/api/check', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(200).send(getUserData(req.user));
    } else {
      res.status(401).send('No session for this user');
    }
  });

  app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) return next(err);

      req.logout();

      res.status(200).send('ok');
    });
  });

  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return;
      }
      if (!user) {
        res.status(401).send(info.message);
        return;
      }
      req.login(user, err => {
        if (err) {
          return next(err);
        }
        return res.status(200).send(getUserData(user));
      });
    })(req, res, next);
  });

  app.post('/api/register', (req, res, next) => {
    const { username, password } = req.body;
    User.create({ username, password })
      .then(user => {
        res.status(200).send(getUserData(user));
      })
      .catch(err => {
        // console.log(`Cannot create user with error ${err.name}`);
        if (err.name === 'ValidationError') {
          res.status(400).send('Username is already taken');
        }
      });
  });
};

export default AuthApi;
