import { combineReducers } from "redux";
import { appReducer } from "./app/appReducer";
import { roomReducer } from "./room/roomReducer";
import { socketReducer } from "./socket/socketReducer";
import { userReducer } from "./user/userReducer";

export default combineReducers({
  app: appReducer,
  room: roomReducer,
  socket: socketReducer,
  user: userReducer
});
