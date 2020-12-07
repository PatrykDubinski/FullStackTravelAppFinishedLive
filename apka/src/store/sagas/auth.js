import axios from "axios";
import { call, put } from "redux-saga/effects";
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
    const response = yield axios.post("/app/auth/register", data);
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
    yield axios.post("/app/auth/google", {
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
    // yield localStorage.setItem("token", response.data.token);
    // yield localStorage.setItem("userId", response.data.userId);
    // yield localStorage.setItem("userEmail", response.data.userEmail); // tego chyba nie
    // yield localStorage.setItem("expDate", expDateInMs);
    yield put(
      actions.loginSuccess(
        response.data.token,
        response.data.userId,
        response.data.userEmail // tego tez nie
      )
    );
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
      // const userEmail = localStorage.getItem("userEmail"); // tu tez
      yield put(actions.loginSuccess(token, userId)); // tu tez
    }
  }
}

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "user");
}

export function* getUserDataSaga(action) {
  const response = yield axios.get(`/app/auth/getData/${action.userId}`);
  try {
    yield put(actions.getUserDataSuccess(response.data.user));
  } catch (err) {
    yield put(actions.getUserDataFail(err));
  }
}

// https://morning-waters-81626.herokuapp.com/
