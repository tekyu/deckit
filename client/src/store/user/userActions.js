import axios from "utils/axios";

import { showError } from "store/app/appActions";
import { closeModal } from "store/modal/modalActions";

export const CHECK_USER = `CHECK_USER`;
export const AUTH_USER = `AUTH_USER`;
export const UPDATE_USER = `UPDATE_USER`;
export const UPDATE_ANON_USER = `UPDATE_ANON_USER`;

// TODO:
// make it as a promise cos you cant send formError here
export const loginUser = (username, password) => {
  return dispatch => {
    Promise.then((resolve, reject) => {
      axios
        .post(`/api/login`, {
          username,
          password
        })
        .then(({ status, data }) => {
          if (status === 200) {
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
          reject(error.response.status);
          throw error;
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
        .post(`/api/check`)
        .then(({ data }) => {
          dispatch({
            type: UPDATE_USER,
            user: data
          });
          dispatch({
            type: AUTH_USER,
            auth: true
          });
        })
        .catch(() => {
          dispatch({
            type: AUTH_USER,
            auth: false
          });
        });
    }
  };
};

export const logoutUser = () => {
  axios.get(`/api/logout`).then(() => {
    return dispatch => {
      dispatch({
        type: AUTH_USER,
        auth: true
      });
    };
  });
};

export const updateAnonUser = user => {
  return {
    type: UPDATE_USER,
    user
  };
};

export const updateUser = data => {
  return (dispatch, getState) => {
    if (getState.user) {
      axios
        .post(`/api/update/user`, data)
        .then(() => {
          dispatch({
            type: UPDATE_USER,
            auth: true
          });
        })
        .catch(error => showError(error));
    }
  };
};
