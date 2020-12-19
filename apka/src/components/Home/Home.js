import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Footer from "./Footer/Footer";
import Greetings from "./Greetings/Greetings";
import Header from "./Header/Header";
import HomeInfoPage from "./HomeInfoPage/HomeInfoPage";
import InstructionsPage from "./InstructionsPage/InstructionsPage";
import Map from "./Map/Map";

const Home = ({ isAuth }) => {
  return (
    <div data-test="home">
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

Home.propTypes = {
  isAuth: PropTypes.bool,
};

export default connect(mapStateToProps)(Home);
