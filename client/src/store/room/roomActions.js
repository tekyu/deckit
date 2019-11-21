export const CREATE_ROOM = `CREATE_ROOM`;
export const SET_ACTIVE_ROOM = `SET_ACTIVE_ROOM`;

export const setActiveRoom = activeRoomId => {
  return {
    type: SET_ACTIVE_ROOM,
    activeRoomId
  };
};
