/* eslint-disable no-fallthrough */
/* eslint-disable no-param-reassign */

import produce from "immer";
import {
  SET_ACTIVE_ROOM_ID,
  SET_ACTIVE_ROOM,
  UPDATE_ACTIVE_ROOM,
  UPDATE_ROOMS,
  SCORE_UPDATED
} from "./roomActions";

export const initialState = {
  activeRoomId: null,
  rooms: [],
  activeRoom: null
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
      console.log("UPDATE_ACTIVE_ROOM", action);
      // bodge, need to change this
      draft.activeRoom = draft.activeRoom || {};
      Object.assign(draft.activeRoom, action.payload);
      return draft;
    // case SCORE_UPDATED:
    //   action.payload.forEach(({ id, score }) => {
    //     draft.activeRoom.players[
    //       draft.activeRoom.players.findIndex(
    //         ({ id: playerId }) => playerId === id
    //       )
    //     ].score = score;
    //   });
    // return draft;
    default:
      return draft;
  }
});

export default roomReducer;
