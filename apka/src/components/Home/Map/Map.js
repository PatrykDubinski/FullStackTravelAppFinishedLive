import "./Map.css";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import { connect } from "react-redux";
import AddPointModal from "./AddPointModal/AddPointModal";
import Backdrop from "./Backdrop/Backdrop";
import { Rating } from "@material-ui/lab";
import * as actions from "../../../store/actions/index";
import Loading from "../../UI/Loading/Loading";

const Map = ({ userId, onGetMarkers, markers, images, loading }) => {
  const [marker, setMarker] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "auto",
    height: "90vh",
    latitude: 45.3239336,
    longitude: 18.0994966,
    zoom: 1,
  });

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    onGetMarkers(userId);
  }, [userId, onGetMarkers]);

  const startAddingMarker = (e) => {
    const [longitude, latitude] = e.lngLat;

    setMarker({
      longitude,
      latitude,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="map">
      <ReactMapGL
        mapStyle="mapbox://styles/kreo/ckhmbr9wu0ygq19pogl52cfvn"
        mapboxApiAccessToken="pk.eyJ1Ijoia3JlbyIsImEiOiJja2g4eGpybzgweXhhMndvNTZqYzNwa2w5In0.sud1ozthViKFqwHTyG1PBA"
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onDblClick={startAddingMarker}
      >
        {markers.map((marker) => (
          <React.Fragment key={marker.id}>
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetTop={-30}
              offsetLeft={-13}
            >
              <div
                onClick={() => {
                  setShowPopup({
                    [marker.id]: true,
                  });
                }}
              >
                <img
                  style={{
                    width: `26px`,
                    height: `30px`,
                  }}
                  className="marker"
                  src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
                  alt="marker"
                />
              </div>
            </Marker>
            {showPopup[marker.id] ? (
              <Popup
                key={marker.id}
                latitude={marker.latitude}
                longitude={marker.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup({})}
                anchor="top"
                dynamicPosition={true}
              >
                <div className="popup">
                  <h3>{marker.title}</h3>
                  <p className="popup__date">
                    {new Date(marker.startDate).toLocaleDateString()} -{" "}
                    {new Date(marker.endDate).toLocaleDateString()}
                  </p>
                  <p className="popup__desc">{marker.desc}</p>
                  <Rating readOnly value={marker.rating} />
                  <img src={images} alt="" className="popup__image" />
                  <p className="created">
                    Created: {new Date(marker.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        ))}
        {showModal ? (
          <>
            <Backdrop show={showModal} closeHandler={closeModal} />
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetLeft={-10}
              offsetTop={-25}
            >
              <div>
                <img
                  style={{
                    width: `40px`,
                    height: `45px`,
                  }}
                  className="marker"
                  src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
                  alt="marker"
                />
              </div>
            </Marker>
            <AddPointModal
              show={showModal}
              marker={marker}
              closeModal={handleModalClose}
            />
          </>
        ) : null}
        <div style={{ position: "absolute", right: "5px", bottom: "25px" }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
