import {
  AUTH_USER,
  GET_TEMPORARY_ID_SUCCESS,
  LOGOUT,
  UPDATE_USER,
  UPDATE_ANONYMOUS_USERNAME,
  UPDATED_USER
} from "./userActions";

export const initialState = {
  isAuthorized: false,
  rooms: [],
  userId: null,
  username: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthorized: action.isAuthorized
      };
    case UPDATED_USER:
      console.log("UPDATED_USER [userReducer]", action.user);
      return {
        ...state,
        ...action.params
      };
    case LOGOUT:
      return {
        ...initialState
      };
    case GET_TEMPORARY_ID_SUCCESS:
      return {
        ...state,
        userId: action.userId
      };
    case UPDATE_ANONYMOUS_USERNAME:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
};
