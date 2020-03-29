import axios from "utils/axios";

import { closeModal, showError } from "store/app/appActions";
import { CLOSE_MODAL } from "../app/appActions";

export const CHECK_USER = `CHECK_USER`;
export const AUTH_USER = `AUTH_USER`;
export const UPDATED_USER = `UPDATED_USER`;
export const UPDATE_ANON_USER = `UPDATE_ANON_USER`;

export const updateUser = data => {
  return dispatch => {
    return axios.post("/api/user/update", data).then(data => {
      dispatch({
        type: UPDATED_USER,
        data
      });
    });
  };
};

export const updatedUser = data => {
  return dispatch => {
    dispatch({
      type: UPDATED_USER,
      user: data
    });
  };
};

// TODO:
// make it as a promise cos you cant send formError here
export const loginUser = (username, password) => {
  return dispatch => {
    axios
      .post(`/api/login`, {
        username,
        password
      })
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(updatedUser(data));
          dispatch({
            type: AUTH_USER,
            auth: true
          });
          dispatch(closeModal());
        }
      })
      .catch(error => {
        throw error;
      });
  };
};

export const registerUser = (username, password) => {
  return dispatch => {
    axios
      .post(`/api/register`, {
        username,
        password
      })
      .then(({ data }) => {
        dispatch(updatedUser(data));
        dispatch({
          type: AUTH_USER,
          auth: true
        });
        dispatch({
          type: CLOSE_MODAL
        });
      })
      .catch(error => {
        throw error;
      });
  };
};

export const checkAuth = () => {
  return (dispatch, getState) => {
    if (!getState.user) {
      axios
        .post(`/api/check`)
        .then(({ data }) => {
          dispatch(updatedUser(data));
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
  return dispatch => {
    return axios.post("/api/logout").then(() => {
      dispatch({
        type: AUTH_USER,
        auth: false
      });
      dispatch(updatedUser(null));
    });
  };
};

export const updateAnonUser = user => {
  return {
    type: UPDATED_USER,
    user
  };
};
