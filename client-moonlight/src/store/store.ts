import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { userReducer } from 'store/user/userSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import socketMiddleware from 'store/middlewares/socket';
import { roomReducer } from 'store/room/roomSlice';
import { appReducer } from 'store/app/appSlice';
import { enhancer as withReduxEnhancer } from 'addon-redux';
import { socketTypes } from './socket/socket';

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['initialized'],
};

const appPersistConfig = {
  key: 'app',
  storage,
  whitelist: ['activeTheme'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  room: roomReducer,
  app: persistReducer(appPersistConfig, appReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        socketTypes.emit,
        socketTypes.leave,
        socketTypes.listener,
        socketTypes.removeListener,
      ],
    },
  }).concat(socketMiddleware()),
  enhancers: [withReduxEnhancer],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>
