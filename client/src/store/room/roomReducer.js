import { SET_ACTIVE_ROOM } from "./roomActions";

export const initialState = {
  activeRoomId: null
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ROOM:
      return {
        ...state,
        activeRoomId: action.activeRoomId
      };
    default:
      return state;
  }
};

export default roomReducer;
