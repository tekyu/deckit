import axios from "utils/axios";

export const CREATE_ROOM = `CREATE_ROOM`;
export const SET_ROOM = `SET_ROOM`;
export const UPDATE_ROOMS = `UPDATE_ROOMS`;
export const ADD_MESSAGE = `ADD_MESSAGE`;

export const CREATE_ROOM_REQUEST = `CREATE_ROOM_REQUEST`;
export const CREATE_ROOM_SUCCESS = `CREATE_ROOM_SUCCESS`;
export const CREATE_ROOM_FAILURE = `CREATE_ROOM_FAILURE`;

export const createRoom = options => {
  return dispatch => {
    dispatch({ type: CREATE_ROOM_REQUEST });
    axios
      .post(`/rooms`, { ...options })
      .then(res => {
        const { roomId } = res.data;
        // history.push(`/game/${roomId}`);
        dispatch({ type: CREATE_ROOM_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: CREATE_ROOM_FAILURE });
      });
  };
};

export const setRoom = room => ({
  type: SET_ROOM,
  room
});

export const addMessage = newMessage => ({
  type: ADD_MESSAGE,
  newMessage
});
