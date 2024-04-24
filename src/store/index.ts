import { createStore, compose } from "redux";
import rootReducer from "./reducers";

/* eslint-disable @typescript-eslint/no-explicit-any */
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const store = createStore(rootReducer, initialState, composeEnhancers());
export default store;
