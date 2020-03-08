/* eslint-disable no-param-reassign */
import produce from "immer";
// import {
//   SET_ACTIVE_ROOM_ID,
//   SET_ACTIVE_ROOM,
//   UPDATE_ACTIVE_ROOM,
//   UPDATE_ROOMS
// } from "./deckitActions";

export const initialState = {
  myCard: null,
  pickedCard: null,
  score: 0,
  cards: []
};

export const deckitReducer = produce((draft = initialState, action) => {
  switch (action.type) {
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
});

export default deckitReducer;
