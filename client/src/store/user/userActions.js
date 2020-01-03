import axios from "utils/axios";

import { closeModal } from "store/app/appActions";

export const CHECK_USER = `CHECK_USER`;
export const AUTH_USER = `AUTH_USER`;
export const UPDATE_USER = `UPDATE_USER`;
export const LOGOUT = `LOGOUT_USER`;
export const GET_TEMPORARY_ID_SUCCESS = `GET_TEMPORARY_ID_SUCCESS`;
export const UPDATE_ANONYMOUS_USERNAME = `UPDATE_ANONYMOUS_USERNAME`;

export const getTemporaryId = () => {
  return dispatch => {
    axios.get(`/users/temporary`).then(res => {
      const { userId } = res.data;
      dispatch({ type: GET_TEMPORARY_ID_SUCCESS, userId });
    });
  };
};

export const updateAnonymousUsername = () => ({
  type: UPDATE_ANONYMOUS_USERNAME
});

export const updateUser = params => {
  return dispatch =>
    dispatch({
      type: UPDATE_USER,
      params
    });
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    });
  };
};

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
    // if (!getState.user) {
    //   axios
    //     .post(`/api/check`)
    //     .then(({ data }) => {
    //       dispatch({
    //         type: UPDATE_USER,
    //         user: data
    //       });
    //       dispatch({
    //         type: AUTH_USER,
    //         auth: true
    //       });
    //     })
    //     .catch(() => {
    //       dispatch({
    //         type: AUTH_USER,
    //         auth: false
    //       });
    //     });
    // }
  };
};

export const updateAnonUser = user => {
  return {
    type: UPDATE_USER,
    user
  };
};
