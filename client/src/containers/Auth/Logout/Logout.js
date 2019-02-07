import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "@app/axios";
class Logout extends Component {
	state = {};
	componentDidMount() {
		axios.get("/api/logout").then(response => {
			console.log("response", response);
		});
	}
	render() {
		return <Redirect to="/" />;
	}
}

export default Logout;
