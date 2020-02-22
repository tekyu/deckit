import axios from "utils/axios";
import { closeModal } from "store/app/appActions";

export const CHECK_USER = `CHECK_USER`;
export const AUTH_USER = `AUTH_USER`;
export const UPDATE_USER = `UPDATE_USER`;
export const LOGOUT = `LOGOUT_USER`;
export const GET_TEMPORARY_ID_REQUEST = `GET_TEMPORARY_ID_REQUEST`; /* REQUEST & FAILURE need handling */
export const GET_TEMPORARY_ID_SUCCESS = `GET_TEMPORARY_ID_SUCCESS`;
export const GET_TEMPORARY_ID_FAILURE = `GET_TEMPORARY_ID_FAILURE`;
export const UPDATE_ANONYMOUS_USERNAME = `UPDATE_ANONYMOUS_USERNAME`;

export const getTemporaryId = () => {
  return dispatch => {
    dispatch({ type: GET_TEMPORARY_ID_REQUEST });
    axios
      .get(`/users/temporary`)
      .then(res => {
        const { userId } = res.data;
        dispatch({ type: GET_TEMPORARY_ID_SUCCESS, userId });
      })
      .catch(error => {
        dispatch({ type: GET_TEMPORARY_ID_FAILURE, error });
      });
  };
};

export const updateAnonymousUsername = username => ({
  type: UPDATE_ANONYMOUS_USERNAME,
  username
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

export const updateUser = data => {
  // console.log("updateUser", data);
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
    // console.log("loginUser", dispatch);
    // Promise.then((resolve, reject) => {
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
          // resolve();
        }
      })
      .catch(error => {
        // reject(error.response.status);
        throw error;
        // this.setState((state, props) => {
        // 	// console.log("setsatate", state, props);
        // 	return {
        // 		formError: state.errors[error.response.status]
        // 	};
        // });
      });
    // });
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

// export const userCreated = user => {
//   // console.log("userCreated", user);
//   return dispatch => {
//     dispatch({
//       type: UPDATED_USER,
//       user
//     });
//   };
// };
