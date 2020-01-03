import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { appReducer } from "./app/appReducer";
import { roomReducer } from "./room/roomReducer";
import { roomListReducer } from "./roomList/roomListReducer";
import { socketReducer } from "./socket/socketReducer";
import { userReducer } from "./user/userReducer";

const userPersistConfig = {
  key: `user`,
  storage
};

export default combineReducers({
  app: appReducer,
  room: roomReducer,
  roomList: roomListReducer,
  socket: socketReducer,
  user: persistReducer(userPersistConfig, userReducer)
});
