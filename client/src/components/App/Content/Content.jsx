import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import * as Loadable from "./Loadable/Loadable";
import * as Styled from "./Content.styled";

const Content = auth => {
  return (
    <Styled.Content>
      <Switch>
        <Route path="/logout" exact render={() => <Loadable.Logout />} />
        <Route path="/register" exact render={() => <Loadable.Register />} />
        <Route path="/login" exact render={() => <Loadable.Login />} />
        <Route
          path="/browse"
          exact
          render={() => <Loadable.Browse auth={false} />}
        />
        <Route path="/game/:id" render={() => <Loadable.GameContainer />} />
        <Route
          path="/create"
          exact
          render={() => <Loadable.CreateGame auth={false} />}
        />
        <Route
          path="/user"
          exact
          render={() => <Loadable.CreateGame auth={false} />}
        />
        <Route
          path="/leaderboards"
          exact
          render={() => <Loadable.CreateGame auth={false} />}
        />
        <Route path="/" exact render={() => <Loadable.Browse auth={false} />} />
      </Switch>
    </Styled.Content>
  );
};

Content.propTypes = {
  auth: PropTypes.bool.isRequired
};

export default Content;
