import CreateGame from 'containers/CreateGame/CreateGame';
import Credits from 'containers/Credits/Credits';
import Dashboard from 'containers/Dashboard/Dashboard';
import RoomContainer from 'containers/RoomContainer/RoomContainer';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = (): JSX.Element => (
  <Switch>
    <Route path="/" exact render={() => <Dashboard />} />
    <Route path="/create" exact render={() => <CreateGame />} />
    <Route path="/game/:id" render={() => <RoomContainer />} />
    <Route path="/credits" render={() => <Credits />} />
  </Switch>
);

export default Routes;
