import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "./assets/icons/icons";
import "./assets/css/normalize.min.css";
import "./assets/css/index.scss";
import { history, persistor, store } from "store/store";
import App from "components/App/App";

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById(`root`));
