import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import "./index.scss";
import MainRoutes from "./routes/MainRoutes";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
