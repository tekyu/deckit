import React, { Component } from "react";
// import Header from "@layout/Header/Header";
// import axios from "@app/axios";

class Layout extends Component {
	state = {
		auth: false
	};

	// submitHandler = event => {
	// 	event.preventDefault();
	// 	const [username, password] = [
	// 		event.target.children.username.value,
	// 		event.target.children.password.value
	// 	];
	// 	axios
	// 		.post("/login", {
	// 			username: username,
	// 			password: password
	// 		})
	// 		.then(function(response) {
	// 			console.log(response);
	// 		})
	// 		.catch(function(error) {
	// 			console.log(error);
	// 		});
	// 	console.log("submit", username, password);
	// };
	// submitHandler2 = event => {
	// 	event.preventDefault();
	// 	const [username, password] = [
	// 		event.target.children.username.value,
	// 		event.target.children.password.value
	// 	];
	// 	axios
	// 		.post("/register", {
	// 			username: username,
	// 			password: password
	// 		})
	// 		.then(function(response) {
	// 			console.log(response);
	// 		})
	// 		.catch(function(error) {
	// 			console.log(error);
	// 		});
	// 	console.log("submit", username, password);
	// };

	render() {
		return <React.Fragment>Test</React.Fragment>;
	}
}

// const mapStateToProps = state => {
//     return {
//         auth: state.auth
//     };
// };
// const mapDispatchToProps = dispatch => {
//     return {};
// };
// export default withRouter(
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(Layout)
// );
export default Layout;
