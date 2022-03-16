import AuthApi from './auth/auth';
import UserApi from './user/user';

const Api = (app: any, passport: any) => {
  AuthApi(app, passport);
  UserApi(app);
};

export default Api;

// const loggedInOnly = (req, res, next) => {
//   if (req.isAuthenticated()) next();
//   else res.redirect('/login');
// };

// const loggedOutOnly = (req, res, next) => {
//   if (req.isUnauthenticated()) next();
//   else res.redirect('/');
// };
