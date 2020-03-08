import axios from "utils/axios";
import { history } from "store/store";
import { emitter } from "store/socket/socketActions";

export const SET_ACTIVE_ROOM_ID = `SET_ACTIVE_ROOM_ID`;
export const SET_ACTIVE_ROOM = `SET_ACTIVE_ROOM`;
export const CREATE_ROOM = `CREATE_ROOM`;
export const SET_ROOM = `SET_ROOM`;
export const UPDATE_ROOMS = `UPDATE_ROOMS`;
export const ADD_MESSAGE = `ADD_MESSAGE`;

export const CREATE_ROOM_REQUEST = `CREATE_ROOM_REQUEST`;
export const CREATE_ROOM_SUCCESS = `CREATE_ROOM_SUCCESS`;
export const CREATE_ROOM_FAILURE = `CREATE_ROOM_FAILURE`;

export const FETCH_ROOM_REQUEST = `FETCH_ROOM_REQUEST`;
export const FETCH_ROOM_SUCCESS = `FETCH_ROOM_SUCCESS`;
export const FETCH_ROOM_FAILURE = `FETCH_ROOM_FAILURE`;

export const UPDATE_ACTIVE_ROOM = `UPDATE_ACTIVE_ROOM`;

export const createRoom = options => async dispatch => {
  dispatch({ type: CREATE_ROOM_REQUEST });
  try {
    const res = await axios.post(`/rooms`, { ...options });
    const { roomId } = res.data;
    history.push(`/game/${roomId}`);
    dispatch({ type: CREATE_ROOM_SUCCESS });
  } catch (error) {
    dispatch({ type: CREATE_ROOM_FAILURE, error });
  }
}

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

export const joinRoom = ({ roomId, userId, username }) => async dispatch => {
  dispatch({ type: FETCH_ROOM_REQUEST });
  try {
    const res = await axios.get(`/rooms/${roomId}`);
    const { room } = res.data;
    dispatch(
      emitter({
        event: `playerJoinRoom`,
        data: {
          roomId: room.roomId,
          userId,
          username
        }
      })
    );
    dispatch({ type: FETCH_ROOM_SUCCESS, room });
  } catch (error) {
    dispatch({ type: FETCH_ROOM_FAILURE, error });
  }
};

export const addMessage = newMessage => ({ type: ADD_MESSAGE, newMessage });

export const leaveRoom = roomId => {
  return dispatch => {
    dispatch(emitter("LEAVE_ROOM", { roomId }));
  };
};

export const updateActiveRoom = roomData => {
  return dispatch => {
    dispatch({
      type: UPDATE_ACTIVE_ROOM,
      roomData
    });
  };
};

export const updatePlayerInRoom = data => {
  return dispatch => {
    dispatch(emitter(`UPDATE_PLAYER`, data));
  };
};

export const startGame = ({ activeRoomId }) => {
  return dispatch => {
    dispatch(emitter(`START_GAME`, { activeRoomId }));
  };
};

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
