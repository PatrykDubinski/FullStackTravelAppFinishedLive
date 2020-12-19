import React from "react";
import "./Nav.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import NavItem from "./NavItem/NavItem";

const Nav = React.memo(
  ({ authLoading, markerLoading, isAuth, profile }) => {
    return (
      <nav className="nav">
        {authLoading || markerLoading ? null : (
          <ul className="nav__list">
            {!isAuth ? (
              <NavItem path="register">Authorization</NavItem>
            ) : (
              <>
                {profile ? (
                  <NavItem path="">Map</NavItem>
                ) : (
                  <NavItem path="profile">Profile</NavItem>
                )}
                <NavItem path="logout">Logout</NavItem>
              </>
            )}
          </ul>
        )}
      </nav>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.markerLoading !== nextProps.markerLoading) {
      return true;
    }
  }
);

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token != null,
    userEmail: state.auth.userEmail,
    authLoading: state.auth.loading,
    markerLoading: state.marker.loading,
  };
};

Nav.propTypes = {
  authLoading: PropTypes.bool,
  markerLoading: PropTypes.bool,
  isAuth: PropTypes.bool,
  profile: PropTypes.bool,
};

export default connect(mapStateToProps)(Nav);
