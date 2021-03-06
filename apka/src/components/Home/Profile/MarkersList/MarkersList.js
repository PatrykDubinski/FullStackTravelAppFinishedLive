import React, { useEffect } from "react";
import "./MarkersList.css";

import { connect } from "react-redux";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import test from "../../../../assets/images/map.jpg";
import * as actions from "../../../../store/actions/index";

const MarkersList = ({
  onGetMarkers,
  userId,
  markers,
  onDeleteMarker,
  loading,
}) => {
  useEffect(() => {
    onGetMarkers(userId);
  }, [onGetMarkers, userId]);

  const deleteMarkerHandler = (e) => {
    e.preventDefault();
    onDeleteMarker(e.target.id, userId);
    onGetMarkers(userId);
  };

  return (
    <>
      {!loading ? (
        <div className="markersList">
          {markers.length > 0 ? (
            markers.map((marker) => (
              <Link
                style={{ textDecoration: "none" }}
                to={`/marker/${marker.id}`}
                key={marker.id}
              >
                <div id={marker.id} className="marker">
                  <img src={test} alt="" />
                  <p className="marker__date">
                    {new Date(
                      new Date(marker.startDate).getFullYear(),
                      new Date(marker.startDate).getMonth(),
                      new Date(marker.startDate).getDate()
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      new Date(marker.endDate).getFullYear(),
                      new Date(marker.endDate).getMonth(),
                      new Date(marker.endDate).getDate()
                    ).toLocaleDateString()}
                  </p>
                  <p className="marker__title">{marker.title}</p>
                  <Rating readOnly value={marker.rating} />
                  <p className="marker__separator">|</p>
                  <p>
                    Created:{" "}
                    {new Date(
                      new Date(marker.createdAt).getFullYear(),
                      new Date(marker.createdAt).getMonth(),
                      new Date(marker.createdAt).getDate()
                    ).toLocaleDateString()}
                  </p>
                  <div className="marker__buttons">
                    <button
                      id={marker.id}
                      onClick={(e) => deleteMarkerHandler(e)}
                      className="marker__buttons-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h2>You haven't placed any markers yet</h2>
          )}
        </div>
      ) : (
        <div className="loadingProfile">
          <div className="loader">Loading...</div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    markers: state.marker.markers,
    images: state.marker.images,
    loading: state.marker.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMarkers: (userId) => dispatch(actions.getMarkers(userId)),
    onDeleteMarker: (markerId) => dispatch(actions.deleteMarker(markerId)),
  };
};

MarkersList.propTypes = {
  onGetMarkers: PropTypes.func,
  userId: PropTypes.string,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string,
      desc: PropTypes.string,
      endDate: PropTypes.string,
      id: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      rating: PropTypes.number,
      startDate: PropTypes.string,
      title: PropTypes.string,
      photo: PropTypes.shape({
        contentType: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
      }),
    })
  ),
  onDeleteMarker: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkersList);
