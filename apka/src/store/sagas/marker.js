// Library imports
import axios from "axios";
import { put } from "redux-saga/effects";

// My components imports
import * as actions from "../actions/index";
import { arrayBufferToBase64 } from "..";

export function* updateMarkerSaga(action) {
  yield put(actions.updateMarkerStart());
  try {
    yield axios.patch(`/marker/${action.markerId}`, [
      {
        propName: "title",
        value: action.title,
      },
      {
        propName: "desc",
        value: action.desc,
      },
      {
        propName: "startDate",
        value: action.startDate,
      },
      {
        propName: "endDate",
        value: action.endDate,
      },
      {
        propName: "rating",
        value: action.rating,
      },
    ]);
    yield put(actions.updateMarkerSuccess());
  } catch (err) {
    yield put(actions.updateMarkerFail(err));
  }
}

export function* getMarkerDetails(action) {
  yield put(actions.getMarkerDetailsStart());
  try {
    const response = yield axios.get(`/marker/${action.markerId}`);
    yield put(actions.getMarkerDetailsSuccess(response.data));
  } catch (err) {
    yield put(actions.getMarkerDetailsFail(err));
  }
}

export function* deleteMarkerSaga(action) {
  yield put(actions.deleteMarkerStart());
  const markerId = action.markerId;
  try {
    yield axios.delete(`/marker/delete`, {
      data: {
        markerId,
      },
    });
    yield put(actions.deleteMarkerSuccess());
  } catch (err) {
    yield put(actions.deleteMarkerFail());
  }
}

export function* getMarkersSaga(action) {
  yield put(actions.getMarkersStart());
  const userId = action.userId;
  try {
    const response = yield axios.get(`/marker?userId=${userId}`);
    let base64Flag;
    let imageStr;
    let image;
    if (response.data.markers.length > 0) {
      base64Flag = "data:image/jpeg;base64,";
      imageStr = arrayBufferToBase64(response.data.markers[0].photo.data.data);
      image = base64Flag + imageStr;
    }
    yield put(actions.getMarkersSuccess(response, image));
  } catch (error) {
    yield put(actions.getMarkersFail(error.response.data.message));
  }
}

export function* addMarkerSaga(action) {
  yield put(actions.addMarkerStart());
  const data = action.data;
  try {
    yield axios.post(`/marker/add`, data);
    yield put(actions.addMarkerSuccess());
    yield put(actions.getMarkers(action.userId));
  } catch (error) {
    yield put(actions.addMarkerFail(error.response.data.message));
  }
}
