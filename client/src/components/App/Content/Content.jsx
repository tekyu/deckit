import React from "react";
import { Switch, Route } from "react-router-dom";
import * as Loadable from "./Loadable/Loadable";

const Content = () => {
  return (
    <Switch>
      <Route path="/browse" exact render={() => <Loadable.Browse />} />
      <Route path="/game/:roomId" render={() => <Loadable.GameContainer />} />
      <Route path="/create" exact render={() => <Loadable.CreateGame />} />
      <Route path="/user" exact render={() => <Loadable.CreateGame />} />
      <Route path="/" exact render={() => <Loadable.Browse />} />
    </Switch>
  );
};

export default Content;
