import React from "react";
import "./HomeInfoPage.css";

import { ReactComponent as Travel } from "../../../assets/images/travel.svg";

const HomeInfoPage = () => {
  return (
    <section className="homeInfoPage">
      <h1>We all love travelling!</h1>
      <article className="homeInfoPage__wrapper">
        <div className="homeInfoPage__left">
          <Travel />
        </div>
        <div className="homeInfoPage__right">
          <h2>Now you can keep your best memories in one place!</h2>
          <p>Photos, dates, places and the most important... your feelings!</p>
        </div>
      </article>
    </section>
  );
};

export default HomeInfoPage;
