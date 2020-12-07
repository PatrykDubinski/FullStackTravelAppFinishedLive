import * as actionTypes from "./actionTypes";

/*  Register  */

export const register = (firstName, lastName, nickname, email, password) => {
  return {
    type: actionTypes.REGISTER_USER,
    firstName,
    lastName,
    email,
    nickname,
    password,
  };
};

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_USER_START,
  };
};

export const registerSuccess = (response) => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
  };
};

export const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_USER_FAIL,
    error,
  };
};

/*  Login  */

export const login = (email, password) => {
  return {
    type: actionTypes.LOGIN_USER,
    email: email,
    password: password,
  };
};

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_USER_START,
  };
};

export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    token,
    userId,
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_USER_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

export const loginCheck = () => {
  return {
    type: actionTypes.CHECK_LOGIN,
  };
};

export const checkLoginTimeout = (expirationTime) => {
  return {
    type: actionTypes.CHECK_LOGIN_TIMEOUT,
    expirationTime: expirationTime,
  };
};

/* GOOGLE AUTH */

export const googleAuth = (code) => {
  return {
    type: actionTypes.GOOGLE_AUTH,
    code,
  };
};

export const googleAuthStart = () => {
  return {
    type: actionTypes.GOOGLE_AUTH_START,
  };
};

export const googleAuthSuccess = (token, user) => {
  return {
    type: actionTypes.GOOGLE_AUTH_SUCCESS,
    token,
    user,
  };
};

export const googleAuthFail = (error) => {
  return {
    type: actionTypes.GOOGLE_AUTH_FAIL,
    error,
  };
};

/* GET USER DATA */

export const getUserData = (userId) => {
  return {
    type: actionTypes.GET_USER_DATA,
    userId,
  };
};

export const getUserDataStart = () => {
  return {
    type: actionTypes.GET_USER_DATA_START,
  };
};

export const getUserDataSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_DATA_SUCCESS,
    user,
  };
};

export const getUserDataFail = (error) => {
  return {
    type: actionTypes.GET_USER_DATA_FAIL,
    error,
  };
};
