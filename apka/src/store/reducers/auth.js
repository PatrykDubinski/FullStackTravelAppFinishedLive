import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  userEmail: null,
  error: null,
  loading: false,
  user: null,
};

const registerUserStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const registerUserSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
  };
};

const registerUserFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const loginUserStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const loginUserSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    token: action.token,
    userId: action.userId,
  };
};

const loginUserFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const userLogout = (state, action) => {
  return initialState;
};

const googleAuthStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const googleAuthSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    user: action.user,
    token: action.token,
  };
};

const googleAuthFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const getUserDataStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const getUserDataSuccess = (state, action) => {
  console.log(action);
  return {
    ...state,
    loading: false,
    user: action.user,
  };
};

const getUserDataFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA_START:
      return getUserDataStart(state, action);
    case actionTypes.GET_USER_DATA_SUCCESS:
      return getUserDataSuccess(state, action);
    case actionTypes.GET_USER_DATA_FAIL:
      return getUserDataFail(state, action);
    case actionTypes.REGISTER_USER_START:
      return registerUserStart(state, action);
    case actionTypes.REGISTER_USER_SUCCESS:
      return registerUserSuccess(state, action);
    case actionTypes.REGISTER_USER_FAIL:
      return registerUserFail(state, action);
    case actionTypes.LOGIN_USER_START:
      return loginUserStart(state, action);
    case actionTypes.LOGIN_USER_SUCCESS:
      return loginUserSuccess(state, action);
    case actionTypes.LOGIN_USER_FAIL:
      return loginUserFail(state, action);
    case actionTypes.USER_LOGOUT:
      return userLogout(state, action);
    case actionTypes.GOOGLE_AUTH_START:
      return googleAuthStart(state, action);
    case actionTypes.GOOGLE_AUTH_SUCCESS:
      return googleAuthSuccess(state, action);
    case actionTypes.GOOGLE_AUTH_FAIL:
      return googleAuthFail(state, action);
    default:
      return state;
  }
};

export default reducer;
