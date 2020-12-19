import React from "react";
import "./Greetings.css";

import mapImg from "../../../assets/images/map.jpg";

const Greetings = () => {
  return (
    <section className="greetings" data-test="greetings">
      <div className="greetings__left">
        <h1>Make your memories alive!</h1>
        <p>
          Now you know everything you need. You can share your memories with us!
          To the right you can see a map example with some markers. For further
          questions feel free to contact us throught form in your account
          settings.
        </p>
        <h3>Have fun posting!</h3>
      </div>
      <div className="greetings__right" data-test="greetings__right">
        <img src={mapImg} alt="map" />
      </div>
    </section>
  );
};

export default Greetings;
