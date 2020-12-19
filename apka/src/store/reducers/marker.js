import * as actionTypes from "../actions/actionTypes";

const initialState = {
  markers: [],
  images: [],
  error: null,
  loading: false,
};

const updateMarkerStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const updateMarkerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const updateMarkerFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const getMarkersStart = (state, action) => {
  return { ...state, loading: true };
};

const getMarkersSuccess = (state, action) => {
  return {
    ...state,
    markers: action.markers,
    images: action.images,
    loading: false,
    error: null,
  };
};

const getMarkersFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const addMarkerStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const addMarkerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
  };
};

const addMarkerFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const deleteMarkerStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const deleteMarkerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const deleteMarkerFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const getMarkerDetailsStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const getMarkerDetailsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    markers: action.marker.marker,
  };
};

const getMarkerDetailsFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_MARKER_START:
      return updateMarkerStart(state, action);
    case actionTypes.UPDATE_MARKER_SUCCESS:
      return updateMarkerSuccess(state, action);
    case actionTypes.UPDATE_MARKER_FAIL:
      return updateMarkerFail(state, action);
    case actionTypes.GET_MARKER_DETAILS_START:
      return getMarkerDetailsStart(state, action);
    case actionTypes.GET_MARKER_DETAILS_SUCCESS:
      return getMarkerDetailsSuccess(state, action);
    case actionTypes.GET_MARKER_DETAILS_FAIL:
      return getMarkerDetailsFail(state, action);
    case actionTypes.DELETE_MARKER_START:
      return deleteMarkerStart(state, action);
    case actionTypes.DELETE_MARKER_SUCCESS:
      return deleteMarkerSuccess(state, action);
    case actionTypes.DELETE_MARKER_FAIL:
      return deleteMarkerFail(state, action);
    case actionTypes.GET_MARKERS_START:
      return getMarkersStart(state, action);
    case actionTypes.GET_MARKERS_SUCCESS:
      return getMarkersSuccess(state, action);
    case actionTypes.GET_MARKERS_FAIL:
      return getMarkersFail(state, action);
    case actionTypes.ADD_MARKER_START:
      return addMarkerStart(state, action);
    case actionTypes.ADD_MARKER_SUCCESS:
      return addMarkerSuccess(state, action);
    case actionTypes.ADD_MARKER_FAIL:
      return addMarkerFail(state, action);
    default:
      return state;
  }
};

export default reducer;
