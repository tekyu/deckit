import {
  GET_ROOM_LIST_REQUEST,
  GET_ROOM_LIST_SUCCESS,
  GET_ROOM_LIST_FAILURE
} from "./roomListActions";

export const initialState = {
  isFetchingRooms: false,
  roomList: []
};

export const roomListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM_LIST_REQUEST:
      return {
        ...state,
        isFetchingRooms: true
      };
    case GET_ROOM_LIST_SUCCESS:
      return {
        ...state,
        isFetchingRooms: false,
        roomList: action.rooms
      };
    case GET_ROOM_LIST_FAILURE:
      return {
        ...state,
        isFetchingRooms: false
      };
    default:
      return state;
  }
};
