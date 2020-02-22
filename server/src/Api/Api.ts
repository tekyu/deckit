import { User } from '../schemas/User';
import AuthApi from '../Api/auth/auth';
import UserApi from '../Api/user/user';
const Api = (app: any, passport: any) => {
  console.log('Api loaded');
  AuthApi(app, passport);
  UserApi(app, passport);

  app.get('/api/getRooms', (req, res, next) => {
    console.log('getRooms');
  });
};

export default Api;
