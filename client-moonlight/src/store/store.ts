import {
  configureStore, EnhancedStore, ThunkDispatch, Action,
} from '@reduxjs/toolkit';
import { combineReducers, Middleware } from 'redux';
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
import { useDispatch } from 'react-redux';
import { gameReducer } from 'store/game/gameSlice';
import { socketTypes } from './socket/socket';

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['initialized', 'kickedFrom'],
};

const appPersistConfig = {
  key: 'app',
  storage,
  whitelist: ['activeTheme', 'theme', 'language'],
};

const roomPersistConfig = {
  key: 'room',
  storage,
  whitelist: ['activeRoomId'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  room: persistReducer(roomPersistConfig, roomReducer),
  app: persistReducer(appPersistConfig, appReducer),
  game: gameReducer,
});

export const makeStore = (): EnhancedStore => configureStore({
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
  }).prepend(socketMiddleware() as Middleware<
    (action: Action<'specialAction'>) => number,
    RootState
  >),
  enhancers: [withReduxEnhancer],
});

export const store = makeStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

// Export a hook that can be reused to resolve types
export const useAppDispatch = (): any => useDispatch<AppDispatch>();

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = (): any => useDispatch<ThunkAppDispatch>();
