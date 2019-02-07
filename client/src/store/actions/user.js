import axios from "@app/axios";
import {
	CHECK_USER,
	AUTH_USER,
	UPDATE_USER,
	ERROR
} from "@store/actions/actionCreators";

// export const Login = (username, password) => {
// 	return (dispatch, getState) => {
// 		axios
// 			.post("/api/login", {
// 				username,
// 				password
// 			})
// 			.then(response => {
// 				console.log("response", response);
// 			})
// 			.catch(error => {
// 				console.log("error", error.response);
// 				this.setState((state, props) => {
// 					console.log("setsatate", state, props);
// 					return {
// 						formError: state.errors[error.response.status]
// 					};
// 				});
// 			});
// 	}
// }

export const checkAuth = () => {
	return (dispatch, getState) => {
		if (!getState.user) {
			axios
				.post("/api/check")
				.then(data => {
					dispatch({
						type: CHECK_USER,
						payload: data
					});
					dispatch({
						type: AUTH_USER,
						payload: true
					});
				})
				.catch(error => {
					dispatch({
						type: AUTH_USER,
						payload: false
					});
				});
		}
	};
};

export const updateUser = data => {
	return (dispatch, getState) => {
		if (getState.user) {
			axios
				.post("/api/update/user", data)
				.then(data => {
					dispatch({
						type: UPDATE_USER,
						payload: true
					});
				})
				.catch(error => {
					dispatch({
						type: ERROR,
						payload: { showError: true, errorMessage: error }
					});
				});
		}
	};
};
