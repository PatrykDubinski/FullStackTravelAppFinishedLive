// Library imports
import axios from "axios";
import { call, put } from "redux-saga/effects";

// My components imports
import { loadFromLocalStorage, saveToLocalStorage } from "..";
import {
  getAccessTokenFromCode,
  getGoogleDriveFiles,
} from "../../components/Auth/Google/utilities/utilities";
import * as actions from "../actions/index";

export function* registerSaga(action) {
  yield put(actions.registerStart());
  const data = {
    email: action.email,
    nickname: action.nickname,
    password: action.password,
    firstName: action.firstName,
    lastName: action.lastName,
  };
  try {
    yield axios.post("/auth/register", data);
    yield put(actions.registerSuccess());
  } catch (error) {
    yield put(actions.registerFail(error.response.data.message));
  }
}

export function* googleAuthSaga(action) {
  yield put(actions.googleAuthStart());
  try {
    const { token, expires } = yield getAccessTokenFromCode(action.code);
    const expDateInMs = expires * 1000;
    const expDate = new Date().getTime() + expDateInMs;
    const data = yield getGoogleDriveFiles(token);
    yield saveToLocalStorage(
      {
        token,
        expDate,
        userId: data.id,
      },
      "user"
    );
    yield axios.post("/auth/google", {
      email: data.email,
      nickname: data.name,
      firstName: data.given_name,
      lastName: data.family_name,
      userId: data.id,
      picture: data.picture,
    });
    yield put(actions.loginSuccess(token, data.id));
    yield put(actions.googleAuthSuccess(token, data));
  } catch (err) {
    yield put(actions.googleAuthFail(err));
  }
}

export function* loginSaga(action) {
  yield put(actions.loginStart());
  const data = {
    email: action.email,
    password: action.password,
  };
  try {
    const response = yield axios.post("/auth/login", data);
    const expDateInMs = response.data.expiration * 1000;
    yield saveToLocalStorage(
      {
        token: response.data.token,
        userId: response.data.userId,
        expDate: expDateInMs,
      },
      "user"
    );
    yield put(actions.loginSuccess(response.data.token, response.data.userId));
  } catch (error) {
    yield put(actions.loginFail(error.response.data.message));
  }
}

export function* checkLoginSaga(action) {
  const storage = yield loadFromLocalStorage("user");
  if (!storage) {
    yield put(actions.logout());
  } else {
    const { token, userId, expDate } = storage;
    if (expDate <= new Date().getTime()) {
      yield put(actions.logout());
    } else {
      yield put(actions.loginSuccess(token, userId));
    }
  }
}

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "user");
}

export function* getUserDataSaga(action) {
  const response = yield axios.get(`/auth/getData/${action.userId}`);
  try {
    yield put(actions.getUserDataSuccess(response.data.user));
  } catch (err) {
    yield put(actions.getUserDataFail(err));
  }
}
