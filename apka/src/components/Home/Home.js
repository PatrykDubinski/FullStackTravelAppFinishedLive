import React from "react";

import { connect } from "react-redux";

import Footer from "./Footer/Footer";
import Greetings from "./Greetings/Greetings";
import Header from "./Header/Header";
import HomeInfoPage from "./HomeInfoPage/HomeInfoPage";
import InstructionsPage from "./InstructionsPage/InstructionsPage";
import Map from "./Map/Map";

const Home = ({ isAuth }) => {
  return (
    <div>
      <Header />
      {!isAuth ? (
        <>
          <HomeInfoPage />
          <InstructionsPage />
          <Greetings />
        </>
      ) : (
        <Map />
      )}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Home);
