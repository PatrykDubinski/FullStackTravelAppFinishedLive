import React, { useCallback, useEffect, useState } from "react";
import "./MarkerDetail.css";

import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@material-ui/lab";
import ReactDatePicker from "react-datepicker";

import * as actions from "../../../../../store/actions/index";
import { arrayBufferToBase64 } from "../../../../../store";
import Input from "../../../../UI/Input/Input";

const MarkerDetail = React.memo(
  ({ onGetMarkerDetails, marker, onUpdateMarker, loading }) => {
    const { id } = useParams();
    const history = useHistory();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rating, setRating] = useState(0);

    useEffect(() => {
      onGetMarkerDetails(id);
    }, [onGetMarkerDetails, id]);

    useEffect(() => {
      if (marker) {
        setStartDate(new Date(marker?.startDate));
        setEndDate(new Date(marker?.endDate));
        setTitle(marker?.title);
        setDesc(marker?.desc);
        if (title) {
          setRating(marker?.rating);
        }
      }
    }, [marker, title]);

    let base64Flag;
    let imageStr;
    let myImage;
    if (marker) {
      base64Flag = "data:image/jpeg;base64,";
      imageStr = arrayBufferToBase64(marker?.photo?.data?.data);
      myImage = base64Flag + imageStr;
    }

    let ratingField = <Rating readOnly value={0} />;
    if (marker.rating) {
      ratingField = <Rating precision={0.5} readOnly value={rating} />;
    }

    const updateMarker = useCallback(
      (title, desc, startDate, endDate, rating) => {
        onUpdateMarker(title, desc, startDate, endDate, rating, id);
      },
      [id, onUpdateMarker]
    );

    const saveEdit = () => {
      updateMarker(title, desc, startDate, endDate, rating);
      setIsEditing(!isEditing);
    };

    return (
      <div className="markerDetails">
        <FontAwesomeIcon
          onClick={() => history.push("/profile")}
          icon={faArrowLeft}
          className="back__arrow"
        />
        {!loading ? (
          <div className="markerDetails__data">
            {!isEditing ? (
              <>
                <strong>Title</strong> {title}
                <strong>Description</strong> {desc}
                <strong>From</strong>{" "}
                {new Date(
                  new Date(startDate).getFullYear(),
                  new Date(startDate).getMonth(),
                  new Date(startDate).getDate()
                ).toLocaleDateString()}
                <strong>To</strong>{" "}
                {new Date(
                  new Date(endDate).getFullYear(),
                  new Date(endDate).getMonth(),
                  new Date(endDate).getDate()
                ).toLocaleDateString()}
                {ratingField}
              </>
            ) : (
              <>
                <strong>Title</strong>
                <div className="input__wrapper">
                  <Input
                    required={false}
                    value={title}
                    callback={(e) => setTitle(e)}
                  />
                </div>
                <strong>Description</strong>{" "}
                <div className="input__wrapper">
                  <Input
                    required={false}
                    value={desc}
                    callback={(e) => setDesc(e)}
                  />
                </div>
                <strong>From</strong>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  required
                />
                <strong>To</strong>
                <ReactDatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={new Date(startDate)}
                  required
                />
                {rating ? (
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(e, newVal) => setRating(newVal)}
                    precision={0.5}
                    required
                  />
                ) : (
                  <Rating
                    name="rating"
                    value={0}
                    onChange={(e, newVal) => setRating(newVal)}
                    precision={0.5}
                    required
                  />
                )}
              </>
            )}
            <div className="img__wrapper">
              <img src={myImage} alt="" />
            </div>
            {isEditing ? (
              <button onClick={() => saveEdit()}>Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>
        ) : (
          <div className="loading">
            <div className="loader">Loading...</div>
          </div>
        )}
      </div>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    marker: state.marker.markers,
    loading: state.marker.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMarkerDetails: (markerId) =>
      dispatch(actions.getMarkerDetails(markerId)),
    onUpdateMarker: (title, desc, startDate, endDate, rating, markerId) =>
      dispatch(
        actions.updateMarker(title, desc, startDate, endDate, rating, markerId)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkerDetail);
