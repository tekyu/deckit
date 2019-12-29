import { User } from "../../models/User";

const AuthApi = (app: any, passport: any) => {
  app.post("/api/check", (req, res, next) => {
    console.log("check", req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log("true", req.user);
      const {
        friends,
        activeGames,
        username,
        ranking,
        notifications
      } = req.user;
      const data = {
        friends,
        activeGames,
        username,
        ranking,
        notifications
      };
      res.status(200).send(data);
    } else {
      res.status(401).send();
    }
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) return next(err);

      req.logout();

      res.sendStatus(200);
      console.log("req", req.session, req.user);
    });
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return;
      }
      if (!user) {
        res.status(401).send(info.message);
        return;
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        const { friends, activeGames, username, ranking, notifications } = user;
        const data = {
          friends,
          activeGames,
          username,
          ranking,
          notifications
        };
        return res.status(200).send(data);
      });
    })(req, res, next);
  });

  app.post("/api/register", (req, res, next) => {
    const { username, password } = req.body;
    User.create({ username, password })
      .then(user => {
        console.log(`created user ${user}`);
      })
      .catch(err => {
        console.log(`Cannot create user with error ${err.name}`);
        if (err.name === "ValidationError") {
          res.status(400).send("Username is already taken");
        }
      });
  });
};

export default AuthApi;
