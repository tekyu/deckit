import { User } from '../schemas/User';
import AuthApi from '../api/auth/auth';
import UserApi from '../api/user/user';
const Api = (app: any, passport: any) => {
  console.log('Api loaded');
  AuthApi(app, passport);
  UserApi(app, passport);
};

export default Api;

// const loggedInOnly = (req, res, next) => {
// 	if (req.isAuthenticated()) next();
// 	else res.redirect("/login");
// };

// const loggedOutOnly = (req, res, next) => {
// 	if (req.isUnauthenticated()) next();
// 	else res.redirect("/");
// };
