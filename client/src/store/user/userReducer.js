import { AUTH_USER, UPDATE_USER } from "./userActions";

export const initialState = {
  auth: false,
  user: null
};

export const userReducer = (state = initialState, action) => {
  // TODO: Change state default to only take in consideration parts than touch this reducer
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        auth: action.auth
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};
