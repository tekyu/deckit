import { SOCKET_CLOSE, SOCKET_INIT_SUCCESS } from "./socketActions";

const initialState = {
  isInitialized: false
};

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_INIT_SUCCESS:
      return {
        ...state,
        isInitialized: true
      };
    case SOCKET_CLOSE:
      return {
        ...state,
        isInitialized: false
      };
    default:
      return state;
  }
};
