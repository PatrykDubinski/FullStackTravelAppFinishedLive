import auth from "./auth";
import marker from "./marker";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth,
  marker,
});

export default rootReducer;
