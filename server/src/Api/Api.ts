import { User } from "../schemas/User";
import AuthApi from "../Api/auth/auth";
const Api = (app: any, passport: any) => {
  console.log("Api loaded");
  AuthApi(app, passport);

  app.post("/api/getRooms", (req, res, next) => {
    console.log("check", req.isAuthenticated());

    // app.post("/api/check", (req, res, next) => {
    //   console.log("check", req.isAuthenticated());
    //   if (req.isAuthenticated()) {
    //     console.log("true", req.user);
    //     const {
    //       friends,
    //       activeGames,
    //       username,
    //       ranking,
    //       notifications
    //     } = req.user;
    //     const data = {
    //       friends,
    //       activeGames,
    //       username,
    //       ranking,
    //       notifications
    //     };
    //     res.status(200).send(data);
    //   } else {
    //     res.status(401).send();
    //   }
  });
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
