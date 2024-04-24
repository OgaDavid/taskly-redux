import { combineReducers } from "redux";
import todo from "./todo/reducer";
import modal from "./modal/reducer";

const rootReducer = combineReducers({
  todo,
  modal,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
