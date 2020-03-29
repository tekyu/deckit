import { AUTH_USER, UPDATED_USER } from "./userActions";

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
    case UPDATED_USER:
      return {
        ...state,
        user: { ...state.user, ...action.user }
      };
    default:
      return state;
  }
};
