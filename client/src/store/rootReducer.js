import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { appReducer } from "./app/appReducer";
import { roomReducer } from "./room/roomReducer";
import { userReducer } from "./user/userReducer";

const userPersistConfig = {
  key: `user`,
  storage
};

export default combineReducers({
  app: appReducer,
  room: roomReducer,
  user: persistReducer(userPersistConfig, userReducer)
});
