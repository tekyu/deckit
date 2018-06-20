import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import "./css/reset.css";
import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
import reducer from "./store/reducer";
import thunk from "redux-thunk";
const store = createStore(reducer, applyMiddleware(thunk));
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

window.setTimeout(() => {
    ReactDOM.render(app, document.getElementById("root"));
}, 50000);
// registerServiceWorker();
