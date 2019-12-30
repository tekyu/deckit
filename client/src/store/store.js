/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "store/rootReducer";
import socketMiddleware from "store/middlewares/socket";

const persistConfig = {
  key: `root`,
  storage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancers = compose(
  applyMiddleware(thunk, socketMiddleware()),
  window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

export const store = createStore(persistedReducer, enhancers);
export const persistor = persistStore(store);
