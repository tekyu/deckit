import { User } from '../../schemas/User';
import chalk from 'chalk';
import { getUserData } from '../../utils/getUserData';

const UserApi = (app: any, passport: any) => {
  app.post('/api/user/update', (req, res, next) => {
    if (req.isAuthenticated()) {
      User.findOneAndUpdate({ _id: req.session.passport.user }, req.body)
        .then(user => {
          res.status(200).send(getUserData(user));
        })
        .catch(error => {
          res.status(400).send(`Not able to update user with error ${error}`);
        });
    } else {
      res.status(401).send('No session for this user');
    }
  });
};

export default UserApi;
