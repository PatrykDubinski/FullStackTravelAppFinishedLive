import React, { useEffect, useRef } from "react";

import * as queryString from "query-string";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { TweenMax } from "gsap";

import * as actions from "../../../store/actions/index";

const Google = ({ onGoogleAuth, isAuth }) => {
  const blue = useRef(null);
  const red = useRef(null);
  const yellow = useRef(null);
  const green = useRef(null);
  const history = useHistory();
  const urlParams = queryString.parse(window.location.search);

  useEffect(() => {
    TweenMax.fromTo(
      [blue.current, yellow.current],
      0.5,
      { y: 18 },
      { y: -18, yoyo: true, repeat: -1 }
    );
    TweenMax.fromTo(
      [red.current, green.current],
      0.5,
      { y: -18 },
      { y: 18, repeat: -1, yoyo: true }
    );
    onGoogleAuth(urlParams.code);
    if (isAuth) {
      history.push("/");
    }
  }, [onGoogleAuth, urlParams.code, urlParams.expires_in, isAuth, history]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg viewBox="0 0 150 33.2" width="180" height="150">
        <circle ref={blue} cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
        <circle ref={red} cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
        <circle ref={yellow} cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
        <circle ref={green} cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
      </svg>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGoogleAuth: (code) => dispatch(actions.googleAuth(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Google);
