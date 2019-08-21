import { createStore, applyMiddleware, compose } from "redux";
import reducer from "store/rootReducer";
import thunk from "redux-thunk";
import { initialStore } from "store/initialStore";

const enhancers = compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(reducer, enhancers);
export default store;
