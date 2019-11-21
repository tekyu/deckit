import { SET_ACTIVE_ROOM, UPDATE_ROOMS } from "./roomActions";

export const initialState = {
  activeRoomId: null,
  rooms: []
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ROOM:
      return {
        ...state,
        activeRoomId: action.activeRoomId
      };
    case UPDATE_ROOMS:
      return {
        ...state,
        rooms: action.rooms
      };
    default:
      return state;
  }
};

export default roomReducer;
