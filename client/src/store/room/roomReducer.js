import {
  UPDATE_ROOMS,
  ADD_MESSAGE,
  FETCH_ROOM_REQUEST,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_FAILURE
} from "./roomActions";

export const initialState = {
  isFetchingRoom: false,
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
    case FETCH_ROOM_REQUEST:
      return {
        ...state,
        isFetchingRoom: true
      };
    case FETCH_ROOM_SUCCESS:
      return {
        ...state,
        ...action.room,
        isFetchingRoom: false
      };
    case FETCH_ROOM_FAILURE:
      return {
        ...state,
        isFetchingRoom: false
      };
    case UPDATE_ROOMS:
      return {
        ...state,
        rooms: action.rooms
      };
    case ADD_MESSAGE:
      return {
        ...state,
        chat: [...state.chat, { ...action.newMessage }]
      };
    default:
      return state;
  }
};

export default roomReducer;
