import React from "react";
import Fail from "./Fail/Fail";
import Passes from "./Passes/Passes";
const fakeAuth = true;
const Account = props => {
	const account = fakeAuth ? <Passes /> : <Fail />;
	return <React.Fragment>{account}</React.Fragment>;
};

export default Account;
