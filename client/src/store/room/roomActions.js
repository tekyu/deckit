export const CREATE_ROOM = `CREATE_ROOM`;
export const SET_ROOM = `SET_ROOM`;
export const UPDATE_ROOMS = `UPDATE_ROOMS`;

export const setRoom = room => {
  return {
    type: SET_ROOM,
    room
  };
};

export const updateRooms = rooms => {
  return {
    type: UPDATE_ROOMS,
    rooms
  };
};
