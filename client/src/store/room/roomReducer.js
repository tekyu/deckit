import produce from "immer";
import {
  UPDATE_ROOMS,
  ADD_MESSAGE,
  FETCH_ROOM_REQUEST,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_FAILURE,
  SET_ACTIVE_ROOM_ID,
  SET_ACTIVE_ROOM,
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

export const roomReducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOM_REQUEST:
      draft.isFetchingRoom = true;
      return draft;
    case FETCH_ROOM_SUCCESS:
      // draft.activeRoom = action.room;
      draft.isFetchingRoom = false;
      return draft;
    case FETCH_ROOM_FAILURE:
      draft.isFetchingRoom = false;
      return draft;
    case ADD_MESSAGE:
      draft.chat = [...draft.chat, {...action.newMessage}]
      return draft;
    case SET_ACTIVE_ROOM_ID:
      draft.activeRoomId = action.activeRoomId;
      return draft;
    case SET_ACTIVE_ROOM:
      draft.activeRoom = action.activeRoom;
      return draft;
    case UPDATE_ROOMS:
      draft.rooms = action.rooms;
      return draft;
    case UPDATE_ACTIVE_ROOM:
      draft.activeRoom = action.roomData;
      return draft;
    default:
      return draft;
}
};

export default roomReducer;



/* eslint-disable no-param-reassign */
// import produce from "immer";
// import {
//   SET_ACTIVE_ROOM_ID,
//   SET_ACTIVE_ROOM,
//   UPDATE_ACTIVE_ROOM,
//   UPDATE_ROOMS
// } from "./roomActions";

// export const initialState = {
//   activeRoomId: null,
//   rooms: [],
//   activeRoom: null
// };

// export const roomReducer = produce((draft = initialState, action) => {
//   switch (action.type) {
//     case SET_ACTIVE_ROOM_ID:
//       draft.activeRoomId = action.activeRoomId;
//       return draft;
//     case SET_ACTIVE_ROOM:
//       draft.activeRoom = action.activeRoom;
//       return draft;
//     case UPDATE_ROOMS:
//       draft.rooms = action.rooms;
//       return draft;
//     case UPDATE_ACTIVE_ROOM:
//       draft.activeRoom = action.roomData;
//       return draft;
//     default:
//       return draft;
//   }
// });

// export default roomReducer;