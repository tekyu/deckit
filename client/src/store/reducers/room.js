import { roomStore } from "store/initialStore";
import { SET_ACTIVE_ROOM } from "store/actions/actionCreators";
import simpleState from "store/utils";

const modal = (state = roomStore, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_ROOM:
      console.log("SET_ACTIVE_ROOM", type, payload);
      return simpleState(state, {
        activeRoomId: payload
      });
    default:
      return state;
  }
};

export default modal;
