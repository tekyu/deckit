import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import * as Loadable from "./Loadable/Loadable";

const Content = ({ auth }) => {
  return (
    <Switch>
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
        path="/user"
        exact
        render={() => <Loadable.CreateGame auth={auth} />}
      />
      <Route path="/" exact render={() => <Loadable.Browse auth={auth} />} />
    </Switch>
  );
};

Content.propTypes = {
  auth: PropTypes.bool.isRequired
};

export default Content;
