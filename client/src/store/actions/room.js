import { SET_ACTIVE_ROOM } from "store/actions/actionCreators";

export const setActiveRoom = activeRoomId => {
  console.log(`setActiveRoom`, activeRoomId);
  return {
    type: SET_ACTIVE_ROOM,
    payload: activeRoomId || null
  };
};
