import { User } from '../../schemas/User';
import { getUserData } from '../../utils/getUserData';

const UserApi = (app: any) => {
  app.post('/api/user/update', (req: any, res: any) => {
    if (req.isAuthenticated()) {
      User.findOneAndUpdate({ _id: req.session.passport.user }, req.body)
        .then((user) => {
          res.status(200).send(getUserData(user));
        })
        .catch((error) => {
          res.status(400).send(`Not able to update user with error ${error}`);
        });
    } else {
      res.status(401).send('No session for this user');
    }
  });
};

export default UserApi;
