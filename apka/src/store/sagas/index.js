import * as actionTypes from "../actions/actionTypes";
import { takeEvery } from "redux-saga/effects";
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

export function* watchAuth() {
  yield takeEvery(actionTypes.REGISTER_USER, registerSaga);
  yield takeEvery(actionTypes.LOGIN_USER, loginSaga);
  yield takeEvery(actionTypes.CHECK_LOGIN, checkLoginSaga);
  yield takeEvery(actionTypes.USER_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.GOOGLE_AUTH, googleAuthSaga);
  yield takeEvery(actionTypes.GET_USER_DATA, getUserDataSaga);
}

export function* watchMarkers() {
  yield takeEvery(actionTypes.GET_MARKER_DETAILS, getMarkerDetails);
  yield takeEvery(actionTypes.DELETE_MARKER, deleteMarkerSaga);
  yield takeEvery(actionTypes.GET_MARKERS, getMarkersSaga);
  yield takeEvery(actionTypes.ADD_MARKER, addMarkerSaga);
  yield takeEvery(actionTypes.UPDATE_MARKER, updateMarkerSaga);
}
