// Library imports
import { takeEvery } from "redux-saga/effects";

// My components imports
import * as actionTypes from "../actions/actionTypes";
import {
  checkLoginSaga,
  getUserDataSaga,
  googleAuthSaga,
  loginSaga,
  logoutSaga,
  registerSaga,
} from "./auth";
import {
  addMarkerSaga,
  deleteMarkerSaga,
  getMarkerDetails,
  getMarkersSaga,
  updateMarkerSaga,
} from "./marker";

// Auth sagas controller

export function* watchAuth() {
  yield takeEvery(actionTypes.REGISTER_USER, registerSaga);
  yield takeEvery(actionTypes.LOGIN_USER, loginSaga);
  yield takeEvery(actionTypes.CHECK_LOGIN, checkLoginSaga);
  yield takeEvery(actionTypes.USER_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.GOOGLE_AUTH, googleAuthSaga);
  yield takeEvery(actionTypes.GET_USER_DATA, getUserDataSaga);
}

// Marker sagas controller

export function* watchMarkers() {
  yield takeEvery(actionTypes.GET_MARKER_DETAILS, getMarkerDetails);
  yield takeEvery(actionTypes.DELETE_MARKER, deleteMarkerSaga);
  yield takeEvery(actionTypes.GET_MARKERS, getMarkersSaga);
  yield takeEvery(actionTypes.ADD_MARKER, addMarkerSaga);
  yield takeEvery(actionTypes.UPDATE_MARKER, updateMarkerSaga);
}
