import { emitter } from "store/socket/socketActions";

export const CREATE_ROOM = `CREATE_ROOM`;
export const SET_ACTIVE_ROOM_ID = `SET_ACTIVE_ROOM_ID`;
export const UPDATE_ROOMS = `UPDATE_ROOMS`;
export const SET_ACTIVE_ROOM = `SET_ACTIVE_ROOM`;

export const setActiveRoomId = activeRoomId => {
  return (dispatch, oldState) => {
    console.log("SETACTIVEROOMID", oldState, activeRoomId);
    dispatch({
      type: SET_ACTIVE_ROOM_ID,
      activeRoomId
    });
  };
};

export const setActiveRoom = activeRoom => {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_ROOM,
      activeRoom
    });
  };
};

export const updateRooms = rooms => {
  return {
    type: UPDATE_ROOMS,
    rooms
  };
};

export const leaveRoom = roomId => {
  return dispatch => {
    dispatch(emitter("LEAVE_ROOM", { roomId }));
  };
};
