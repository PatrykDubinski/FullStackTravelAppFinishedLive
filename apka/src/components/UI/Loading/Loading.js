import React, { useEffect } from "react";
import "./Loading.css";

import airplane from "../../../assets/images/airplane.png";
import cloud from "../../../assets/images/cloud.png";

const Loading = () => {
  return (
    <div className="preload">
      <img className="airplane" src={airplane} />
      <h3>Wait for your travel to begin...</h3>
      <img src={cloud} className="cloud1" />
      <img src={cloud} className="cloud2" />
      <img src={cloud} className="cloud3" />
    </div>
  );
};

export default Loading;
