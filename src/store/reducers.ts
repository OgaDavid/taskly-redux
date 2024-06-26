import { combineReducers } from "redux";
import task from "./tasks/reducer";
import modal from "./modal/reducer";

const rootReducer = combineReducers({
  task,
  modal,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
