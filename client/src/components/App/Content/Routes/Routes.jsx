import React from "react";
import { Switch, Route } from "react-router-dom";
import * as Loadable from "./Loadable";

const Routes = auth => {
  // console.log("auth", auth);
  return (
    <Switch>
      <Route path="/logout" exact render={() => <Loadable.Logout />} />
      <Route path="/register" exact render={() => <Loadable.Register />} />
      <Route path="/login" exact render={() => <Loadable.Login />} />
      <Route
        path="/browse"
        exact
        render={() => <Loadable.Browse auth={auth} />}
      />
      <Route path="/game/:id" render={() => <Loadable.GameContainer />} />
      <Route
        path="/create"
        exact
        render={() => <Loadable.CreateGame auth={auth} />}
      />
      <Route
        path="/profile"
        exact
        render={() => <Loadable.Profile auth={auth} />}
      />
      <Route
        path="/leaderboards"
        exact
        render={() => <Loadable.CreateGame />}
      />
      <Route path="/" exact render={() => <Loadable.Browse auth={false} />} />
    </Switch>
  );
};

export default Routes;
