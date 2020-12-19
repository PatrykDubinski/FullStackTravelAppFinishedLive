import React, { useEffect } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

import * as actions from "../../../../store/actions/index";

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

Logout.propTypes = {
  onLogout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Logout);
