import { OPEN_SOCKET, SAVE_DATA } from "./socketActions";

export const initialState = {
  socket: null
};

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SOCKET:
      return { ...state, socket: action.socket };
    case SAVE_DATA:
      return { ...state, socket: action.socket };
    default:
      return state;
  }
};
