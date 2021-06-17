/* eslint-disable no-fallthrough */
/* eslint-disable no-param-reassign */

import produce from "immer";
import {
  SET_ACTIVE_ROOM_ID,
  SET_ACTIVE_ROOM,
  UPDATE_ACTIVE_ROOM,
  UPDATE_ROOMS,
} from "./roomActions";

export const initialState = {
  activeRoomId: null,
  rooms: [],
  activeRoom: null,
};

export const roomReducer = produce((draft = initialState, action) => {
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
      // bodge, need to change this
      draft.activeRoom = draft.activeRoom || {};
      Object.assign(draft.activeRoom, action.payload);
      return draft;
    default:
      return draft;
  }
});

export default roomReducer;
