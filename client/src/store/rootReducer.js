import { combineReducers } from "redux";
import { socketReducer } from "./socket/socketReducer";
import { appReducer } from "./app/appReducer";
import { modalReducer } from "./modal/modalReducer";
import { roomReducer } from "./room/roomReducer";
import { userReducer } from "./user/userReducer";

export default combineReducers({
  app: appReducer,
  user: userReducer,
  modal: modalReducer,
  room: roomReducer,
  socket: socketReducer
});
