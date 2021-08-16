import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from 'components/About/About';
import * as Loadable from './Loadable';

const Routes = (): JSX.Element => (
  <Switch>
    <Route path="/logout" exact render={() => <Loadable.Logout />} />
    <Route path="/register" exact render={() => <Loadable.Register />} />
    <Route path="/login" exact render={() => <Loadable.Login />} />
    <Route
      path="/browse"
      exact
      render={() => <Loadable.Browse />}
    />
    <Route path="/game/:id" render={() => <Loadable.GameContainer />} />
    <Route
      path="/create"
      exact
      render={() => <Loadable.CreateGame />}
    />
    <Route
      path="/profile"
      exact
      render={() => <Loadable.Profile />}
    />
    <Route
      path="/leaderboards"
      exact
      render={() => <Loadable.CreateGame />}
    />
    <Route path="/credits" exact render={() => <About />} />
    <Route path="/" exact render={() => <Loadable.Browse />} />
  </Switch>
);

export default Routes;
