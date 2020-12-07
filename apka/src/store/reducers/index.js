import authReducer from "./auth";
import markerReducer from "./marker";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  marker: markerReducer,
});

export default rootReducer;
