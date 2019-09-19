import { CREATE_ROOM } from "store/actions/actionCreators";

export const createRoom = data => {}; //TODO: should socket be in the window scope with the obfuscated id?

// TODO:
// make it as a promise cos you cant send formError here
// export const loginUser = (username, password) => {
//   console.log('loginuser action', username, password);
//   return dispatch => {
//     Promise.then((resolve, reject) => {
//       axios
//         .post('/api/login', {
//           username,
//           password
//         })
//         .then(({ status, data }) => {
//           if (status === 200) {
//             dispatch({
//               type: UPDATE_USER,
//               payload: data
//             });
//             dispatch({
//               type: AUTH_USER,
//               payload: true
//             });
//             closeModal();
//             resolve();
//           }
//         })
//         .catch(error => {
//           reject(error.response.status);
//           throw error;
//           // this.setState((state, props) => {
//           // 	console.log("setsatate", state, props);
//           // 	return {
//           // 		formError: state.errors[error.response.status]
//           // 	};
//           // });
//         });
//     });
//   };
// };
