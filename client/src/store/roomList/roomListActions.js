import axios from "utils/axios";

export const GET_ROOM_LIST_REQUEST = `GET_ROOM_LIST_REQUEST`;
export const GET_ROOM_LIST_SUCCESS = `GET_ROOM_LIST_SUCCESS`;
export const GET_ROOM_LIST_FAILURE = `GET_ROOM_LIST_FAILURE`;

export const getRoomList = () => {
  return dispatch => {
    dispatch({ type: GET_ROOM_LIST_REQUEST });
    axios
      .get(`/rooms`)
      .then(res => {
        const { rooms } = res.data;
        dispatch({ type: GET_ROOM_LIST_SUCCESS, rooms });
      })
      .catch(error => {
        dispatch({ type: GET_ROOM_LIST_FAILURE, error });
      });
  };
};
