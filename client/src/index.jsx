import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/css/normalize.min.css";
import "./assets/css/index.scss";
import { persistor, store } from "store/store";
import App from "components/App/App";

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
ReactDOM.render(app, document.getElementById(`root`));
