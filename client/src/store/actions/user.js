import axios from "@app/axios";
import { AUTH_USER, UPDATE_USER, ERROR } from "@store/actions/actionCreators";
import { closeModal } from "@store/actions/modals";

//TODO:
// make it as a promise cos you cant send formError here
export const loginUser = (username, password) => {
	console.log("loginuser action", username, password);
	return (dispatch, getState) => {
		new Promise(function(resolve, reject) {
			axios
				.post("/api/login", {
					username,
					password
				})
				.then(({ status, data }) => {
					if (status === 200) {
						console.log("response", status, data);
						dispatch({
							type: UPDATE_USER,
							payload: data
						});
						dispatch({
							type: AUTH_USER,
							payload: true
						});
						closeModal();
						resolve();
					}
				})
				.catch(error => {
					console.log("error", error.response);
					reject(error.response.status);
					// this.setState((state, props) => {
					// 	console.log("setsatate", state, props);
					// 	return {
					// 		formError: state.errors[error.response.status]
					// 	};
					// });
				});
		});
	};
};

export const checkAuth = () => {
	return (dispatch, getState) => {
		if (!getState.user) {
			axios
				.post("/api/check")
				.then(({ data }) => {
					console.log("checkauth", data);
					dispatch({
						type: UPDATE_USER,
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

export const logoutUser = () => {
	axios.get("/api/logout").then(response => {
		return dispatch => {
			dispatch({
				type: AUTH_USER,
				payload: true
			});
		};
	});
};
// export const updateUser = data => {
// 	return (dispatch, getState) => {
// 		if (getState.user) {
// 			axios
// 				.post("/api/update/user", data)
// 				.then(data => {
// 					dispatch({
// 						type: UPDATE_USER,
// 						payload: true
// 					});
// 				})
// 				.catch(error => {
// 					dispatch({
// 						type: ERROR,
// 						payload: { showError: true, errorMessage: error }
// 					});
// 				});
// 		}
// 	};
// };
