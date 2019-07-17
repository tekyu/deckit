import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "@store/actions/user";

class Logout extends Component {
	componentDidMount() {
		console.log("logout");
		// axios.get("/api/logout").then(response => {
		// 	console.log("response", response);
		// });
		logoutUser();
	}
	render() {
		return <Redirect to="/" />;
	}
}

// const mapStateToProps = ({ auth, user }) => {
// 	return {
// 		auth,
// 		user
// 	};
// };

const mapDispatchToProps = {
	logoutUser
};
export default connect(
	null,
	mapDispatchToProps
)(Logout);
