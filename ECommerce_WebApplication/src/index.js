import React from "react";
import reactDOM from "react-dom";
import App from "./App";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reducer from "./reducer/reducer";
import { verifyAuth } from "./actions";
import thunkMiddleware from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/light-bootstrap-dashboard.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  reducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
store.dispatch(verifyAuth);

reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
