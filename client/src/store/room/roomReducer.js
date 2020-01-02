import { SET_ROOM, UPDATE_ROOMS } from "./roomActions";

export const initialState = {
  chat: [],
  createdAt: null,
  decks: [],
  gameCode: null,
  isPublic: null,
  name: null,
  owner: null,
  players: [],
  playersMax: null,
  roomId: null
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM:
      return {
        ...state,
        ...action.room
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
