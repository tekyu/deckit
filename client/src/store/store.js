import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "store/rootReducer";
import socketMiddleware from "store/middlewares/socket";

const enhancers = compose(
  applyMiddleware(thunk, socketMiddleware()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(reducer, enhancers);
export default store;
