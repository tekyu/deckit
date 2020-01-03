export const CREATE_ROOM = `CREATE_ROOM`;
export const SET_ROOM = `SET_ROOM`;
export const UPDATE_ROOMS = `UPDATE_ROOMS`;
export const ADD_MESSAGE = `ADD_MESSAGE`;

export const setRoom = room => ({
  type: SET_ROOM,
  room
});

export const updateRooms = rooms => ({
  type: UPDATE_ROOMS,
  rooms
});

export const addMessage = newMessage => ({
  type: ADD_MESSAGE,
  newMessage
});
