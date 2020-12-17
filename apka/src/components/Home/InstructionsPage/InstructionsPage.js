import React from "react";
import "./InstructionsPage.css";

import { Link } from "react-router-dom";

const InstructionsPage = () => {
  return (
    <section className="instructionsPage">
      <div className="instructionsPage__step step-1">
        <p>
          First you have to register your account to keep track of your travels.
          You can do it by clicking{" "}
          <span className="cursive">Authorization</span> on the top panel or
          just by clicking <Link to="/register">here</Link>.
        </p>
      </div>
      <div className="instructionsPage__middle">
        <div className="instructionsPage__middle-line"></div>
      </div>
      <div className="instructionsPage__step step-2">
        <p>
          After succesfull authorization, you will have more options on the top
          panel. You will be given a map of the world, where you can save and
          check your logs.
        </p>
      </div>
      <div className="instructionsPage__step step-3">
        <p>
          Find a place you visited and double click on it to add marker. Popup
          form will show and you will be asked to fill some information about
          your stay.
        </p>
      </div>
      <div className="instructionsPage__step step-4">
        <p>
          After submitting the form, marker will be visible on the map. By
          clicking on it you can check information you provided. Also there will
          be edit and delete button if you made a mistake.
        </p>
      </div>
      <div className="instructionsPage__step step-5">
        <p>
          In your account settings you can keep track of your travel logs, there
          won't be a map but just a list of your travels, which you can delete
          or edit.
        </p>
      </div>
    </section>
  );
};

export default InstructionsPage;
