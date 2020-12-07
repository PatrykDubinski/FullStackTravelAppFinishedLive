import React from "react";
import "./Backdrop.css";

const Backdrop = ({ show, closeHandler }) => {
  return show && <div className="background" onClick={closeHandler}></div>;
};

export default Backdrop;
