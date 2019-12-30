import { AUTH_USER, LOGOUT, UPDATE_USER } from "./userActions";

export const initialState = {
  isAuthorized: false,
  rooms: [],
  userId: null,
  username: null
};

export const userReducer = (state = initialState, action) => {
  // TODO: Change state default to only take in consideration parts than touch this reducer
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthorized: action.isAuthorized
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.params
      };
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
