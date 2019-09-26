import { User } from "../schemas/User";
import AuthApi from "../Api/auth/auth";
const Api = (app: any, passport: any) => {
  AuthApi(app, passport);
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
