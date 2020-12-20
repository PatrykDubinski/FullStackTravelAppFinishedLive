import React from "react";
import "./Backdrop.css";

import PropTypes from "prop-types";

const Backdrop = ({ show, closeHandler }) => {
  return (
    show && (
      <div
        data-test="backdrop"
        className="background"
        onClick={closeHandler}
      ></div>
    )
  );
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  closeHandler: PropTypes.func,
};

export default Backdrop;
