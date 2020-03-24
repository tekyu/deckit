import { emitter } from "store/socket/socketActions";
import { listener } from "../socket/socketActions";

export const CREATE_ROOM = `CREATE_ROOM`;
export const SET_ACTIVE_ROOM_ID = `SET_ACTIVE_ROOM_ID`;
export const UPDATE_ROOMS = `UPDATE_ROOMS`;
export const SET_ACTIVE_ROOM = `SET_ACTIVE_ROOM`;
export const UPDATE_ACTIVE_ROOM = `UPDATE_ACTIVE_ROOM`;
export const SCORE_UPDATED = `SCORE_UPDATED`;

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

export const updateActiveRoom = roomData => {
  console.log("[ACTION] UPDATEACTIVEROOM", roomData);
  return dispatch => {
    dispatch({
      type: UPDATE_ACTIVE_ROOM,
      payload: roomData
    });
  };
};

export const updatePlayerInRoom = data => {
  return dispatch => {
    dispatch(emitter(`UPDATE_PLAYER`, data));
  };
};

export const updateScoreListener = () => {
  return dispatch => {
    dispatch(
      listener(SCORE_UPDATED, ({ data }) => {
        console.log("SCORE_UPDATED", data);
        dispatch({
          type: SCORE_UPDATED,
          payload: data
        });
      })
    );
  };
};

export const startGame = ({ activeRoomId }) => {
  return dispatch => {
    dispatch(emitter(`START_GAME`, { activeRoomId }));
  };
};

// export const gameStarted = ({ activeRoomId }) => {
//   return dispatch => {
//     dispatch(
//       emitter('GAME_STARTED', { activeRoomId }, userData => {
//         // dispatch(updatedUser(userData));
//       })
//     );
//   }
// }

export const kickPlayer = ({ userId, activeRoomId, adminId }) => {
  return dispatch => {
    dispatch(emitter(`KICK_PLAYER`, { userId, activeRoomId, adminId }));
  };
};

export const changeRoomMode = activeRoomId => {
  return dispatch => {
    dispatch(emitter(`CHANGE_ROOM_MODE`, { activeRoomId }));
  };
};

export const addSeat = activeRoomId => {
  return dispatch => {
    dispatch(emitter(`ADD_SEAT`, { activeRoomId }));
  };
};

export const removeSeat = activeRoomId => {
  return dispatch => {
    dispatch(emitter(`REMOVE_SEAT`, { activeRoomId }));
  };
};
