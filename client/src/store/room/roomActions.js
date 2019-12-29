export const CREATE_ROOM = `CREATE_ROOM`;
export const SET_ACTIVE_ROOM = `SET_ACTIVE_ROOM`;
export const UPDATE_ROOMS = `UPDATE_ROOMS`;

export const setActiveRoom = room => {
  return {
    type: SET_ACTIVE_ROOM,
    room
  };
};

export const updateRooms = rooms => {
  return {
    type: UPDATE_ROOMS,
    rooms
  };
};
