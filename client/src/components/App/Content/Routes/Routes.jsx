import React from "react";
import { Switch, Route } from "react-router-dom";
import * as Loadable from "./Loadable";

const Routes = () => {
	return (
		<Switch>
			<Route path="/logout" exact render={() => <Loadable.Logout />} />
			<Route
				path="/register"
				exact
				render={() => <Loadable.Register />}
			/>
			<Route path="/login" exact render={() => <Loadable.Login />} />
			<Route
				path="/browse"
				exact
				render={() => <Loadable.Browse auth={false} />}
			/>
			<Route
				path="/create"
				exact
				render={() => <Loadable.CreateGame auth={false} />}
			/>
			<Route
				path="/"
				exact
				render={() => <Loadable.Browse auth={false} />}
			/>
		</Switch>
	);
};

export default Routes;
