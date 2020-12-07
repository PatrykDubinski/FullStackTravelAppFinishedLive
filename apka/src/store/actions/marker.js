import * as actionTypes from "./actionTypes";

/* Fetch markers */

export const getMarkers = (userId) => {
  return {
    type: actionTypes.GET_MARKERS,
    userId,
  };
};

export const getMarkersStart = () => {
  return {
    type: actionTypes.GET_MARKERS_START,
  };
};

export const getMarkersSuccess = (response, img) => {
  return {
    type: actionTypes.GET_MARKERS_SUCCESS,
    markers: response.data.markers,
    images: img,
  };
};

export const getMarkersFail = (error) => {
  return {
    type: actionTypes.GET_MARKERS_FAIL,
    error,
  };
};

export const addMarker = (data, userId) => {
  return {
    type: actionTypes.ADD_MARKER,
    data,
    userId,
  };
};

export const addMarkerStart = () => {
  return {
    type: actionTypes.ADD_MARKER_START,
  };
};

export const addMarkerSuccess = () => {
  return {
    type: actionTypes.ADD_MARKER_SUCCESS,
  };
};

export const addMarkerFail = (error) => {
  return {
    type: actionTypes.ADD_MARKER_FAIL,
    error,
  };
};

/* Delete marker */

export const deleteMarker = (markerId, userId) => {
  return {
    type: actionTypes.DELETE_MARKER,
    markerId,
    userId,
  };
};

export const deleteMarkerStart = () => {
  return {
    type: actionTypes.DELETE_MARKER_START,
  };
};

export const deleteMarkerSuccess = () => {
  return {
    type: actionTypes.DELETE_MARKER_SUCCESS,
  };
};

export const deleteMarkerFail = (error) => {
  return {
    type: actionTypes.DELETE_MARKER_FAIL,
    error,
  };
};

export const getMarkerDetails = (markerId) => {
  return {
    type: actionTypes.GET_MARKER_DETAILS,
    markerId,
  };
};

export const getMarkerDetailsStart = () => {
  return {
    type: actionTypes.GET_MARKER_DETAILS_START,
  };
};

export const getMarkerDetailsSuccess = (marker) => {
  return {
    type: actionTypes.GET_MARKER_DETAILS_SUCCESS,
    marker,
  };
};

export const getMarkerDetailsFail = (err) => {
  return {
    type: actionTypes.GET_MARKER_DETAILS_FAIL,
    error: err,
  };
};

export const updateMarker = (
  title,
  desc,
  startDate,
  endDate,
  rating,
  markerId
) => {
  return {
    type: actionTypes.UPDATE_MARKER,
    markerId,
    title,
    desc,
    startDate,
    endDate,
    rating,
  };
};

export const updateMarkerStart = () => {
  return {
    type: actionTypes.UPDATE_MARKER_START,
  };
};

export const updateMarkerSuccess = () => {
  return {
    type: actionTypes.UPDATE_MARKER_SUCCESS,
  };
};

export const updateMarkerFail = (err) => {
  return {
    type: actionTypes.UPDATE_MARKER_FAIL,
    error: err,
  };
};
