import React from "react";
import "./Loading.css";

import airplane from "../../../assets/images/airplane.png";
import cloud from "../../../assets/images/cloud.png";

const Loading = () => {
  return (
    <div className="preload">
      <img className="airplane" src={airplane} alt="" />
      <h3>Wait for your travel to begin...</h3>
      <img src={cloud} className="cloud1" alt="" />
      <img src={cloud} className="cloud2" alt="" />
      <img src={cloud} className="cloud3" alt="" />
    </div>
  );
};

export default Loading;
