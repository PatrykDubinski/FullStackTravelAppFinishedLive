import React, { useEffect, useState } from "react";
import "./AddPointModal.css";

import { Rating } from "@material-ui/lab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actions from "../../../../store/actions/index";
import Input from "../../../UI/Input/Input";

const AddPointModal = ({
  marker,
  userId,
  closeModal,
  onAddMarker,
  markerError,
  loading,
}) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(startDate));
  const { longitude, latitude } = marker;
  const history = useHistory();

  useEffect(() => {
    setShow(true);
  }, []);

  const handleMarkerSubmit = (e) => {
    e.preventDefault();
    const startdateCheck = new Date(startDate).getTime();
    const enddateCheck = new Date(endDate).getTime();
    if (
      title.length === 0 ||
      desc.length === 0 ||
      !rating ||
      !selectedPhoto ||
      !startDate ||
      !endDate ||
      enddateCheck < startdateCheck
    ) {
      setError("You have to fill all data.");
    } else {
      const data = new FormData();
      data.append("title", title);
      data.append("desc", desc);
      data.append("rating", rating);
      data.append("photo", selectedPhoto);
      data.append("startDate", startDate);
      data.append("endDate", endDate);
      data.append("longitude", longitude);
      data.append("latitude", latitude);
      data.append("userId", userId);
      onAddMarker(data, userId);
      if (!markerError && !loading) {
        closeModal();
        history.push("/");
      }
    }
  };

  return (
    <div className={`addPointModal ${show && "open"}`}>
      {loading && <div className="loader">Loading...</div>}
      <h2>Save your point!</h2>
      <form
        onSubmit={(e) => handleMarkerSubmit(e)}
        encType="multipart/form-data"
      >
        <label htmlFor="title">Title</label>
        <div>
          <Input
            required={true}
            value={title}
            callback={(e) => setTitle(e)}
            name="title"
          />
        </div>
        <label htmlFor="desc">Description</label>
        <div>
          <Input
            required={true}
            value={desc}
            callback={(e) => setDesc(e)}
            name="desc"
          />
        </div>
        <label htmlFor="rating">Rating</label>
        <div className="rating">
          <Rating
            name="rating"
            value={rating}
            onChange={(e, newVal) => setRating(newVal)}
            precision={0.5}
            required
          />
        </div>
        <label htmlFor="photo">Photo</label>
        <div className="photo">
          <input
            accept="image/*"
            type="file"
            name="photo"
            onChange={(e) => setSelectedPhoto(e.target.files[0])}
            required
          />
        </div>
        <label htmlFor="startDate">Start Date</label>
        <div className="date">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            required
          />
        </div>
        <label htmlFor="endDate">End Date</label>
        <div className="date">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={new Date(startDate)}
            required
          />
        </div>
        <button className="submitPoint" type="submit">
          Mark your point!
        </button>
        {error && error}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    loading: state.marker.loading,
    markerError: state.marker.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMarker: (data, userId) => dispatch(actions.addMarker(data, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPointModal);
