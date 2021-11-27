/* eslint-disable import/no-cycle */
import axios from 'utils/axios';
import { emitter } from 'store/socket/socketActions';
import { closeModal } from 'store/app/appActions';

export const CHECK_USER = 'CHECK_USER';
export const AUTH_USER = 'AUTH_USER';
export const UPDATED_USER = 'UPDATED_USER';
export const UPDATE_ANON_USER = 'UPDATE_ANON_USER';

export const updateUser = (data) => (dispatch) => axios.post('/api/user/update', data).then((data) => {
  dispatch({
    type: UPDATED_USER,
    data,
  });
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const updatedUser = (username, handler = () => { }) => {
  console.trace('handler', handler);
  return (dispatch) => dispatch(
    emitter(UPDATE_ANON_USER, { username }, (userData) => {
      dispatch({ type: UPDATED_USER, user: userData });
      handler(userData);
    }),
  );
};

// TODO:
// make it as a promise cos you cant send formError here
export const loginUser = (username, password) => (dispatch) => {
  axios
    .post('/api/login', {
      username,
      password,
    })
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(updatedUser(data));
        dispatch({
          type: AUTH_USER,
          auth: true,
        });
        dispatch(closeModal());
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const registerUser = (username, password) => (dispatch) => {
  axios
    .post('/api/register', {
      username,
      password,
    })
    .then(({ data }) => {
      dispatch(updatedUser(data));
      dispatch({
        type: AUTH_USER,
        auth: true,
      });
      dispatch(closeModal());
    })
    .catch((error) => {
      throw error;
    });
};

export const checkAuth = () => (dispatch, getState) => {
  if (!getState.user) {
    axios
      .post('/api/check')
      .then(({ data }) => {
        dispatch(updatedUser(data));
        dispatch({
          type: AUTH_USER,
          auth: true,
        });
      })
      .catch(() => {
        dispatch({
          type: AUTH_USER,
          auth: false,
        });
      });
  }
};

export const logoutUser = () => (dispatch) => axios.post('/api/logout').then(() => {
  dispatch({
    type: AUTH_USER,
    auth: false,
  });
  dispatch(updatedUser(null));
});

export const updateAnonUser = (user) => ({
  type: UPDATED_USER,
  user,
});