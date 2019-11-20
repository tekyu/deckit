import { combineReducers } from "redux";
import { app, modal, user, socket, room } from "store/reducers";

export default combineReducers({
  app,
  user,
  modal,
  socket,
  room
});
