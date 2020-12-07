import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Profile.css";
import styled from "styled-components";
import test from "../../../assets/images/map.jpg";
import MarkersList from "./MarkersList/MarkersList";
import FriendsList from "./FriendsList/FriendsList";
import { connect } from "react-redux";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledProfileTop = styled.div`
  background: url("${(props) => props.bgImage}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 15px;
  min-height: 65vh;
  display: flex;
  position: relative;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const Profile = React.memo(({ user }) => {
  const [markersMenu, setMarkersMenu] = useState(true);

  const editField = (e) => {
    console.log(e.target.id);
  };

  return (
    <>
      <Header profile={true} />
      <div className="profile">
        <StyledProfileTop bgImage={test}>
          <div className="profile__top-profilePic">
            <img src={test} alt="Profile" />
          </div>
          <div className="profile__top-info-wrapper">
            <h1 className="profile__top-username">
              {user?.nickname}{" "}
              <FontAwesomeIcon
                id="nickname"
                onClick={(e) => editField(e)}
                style={{
                  marginLeft: "10px",
                  fontSize: "15px",
                  marginBottom: "7px",
                  cursor: "pointer",
                }}
                icon={faPencilAlt}
              />
            </h1>
            <strong>First Name</strong>
            <p className="profile__data">
              {user?.firstName}{" "}
              <FontAwesomeIcon
                id="firstName"
                onClick={(e) => editField(e)}
                style={{
                  marginLeft: "10px",
                  fontSize: "15px",
                  marginBottom: "3px",
                  cursor: "pointer",
                }}
                icon={faPencilAlt}
              />
            </p>
            <strong>Last Name</strong>
            <p className="profile__data">
              {user?.lastName}{" "}
              <FontAwesomeIcon
                id="lastName"
                onClick={(e) => editField(e)}
                style={{
                  marginLeft: "10px",
                  fontSize: "15px",
                  marginBottom: "3px",
                  cursor: "pointer",
                }}
                icon={faPencilAlt}
              />
            </p>
            <strong>Age</strong>
            <p className="profile__data">
              {user?.age ? user?.age : "--"}{" "}
              <FontAwesomeIcon
                id="age"
                onClick={(e) => editField(e)}
                style={{
                  marginLeft: "10px",
                  fontSize: "15px",
                  marginBottom: "3px",
                  cursor: "pointer",
                }}
                icon={faPencilAlt}
              />
            </p>
            <strong>About me</strong>
            <p className="profile__data">
              {user?.about ? user?.about : "--"}{" "}
              <FontAwesomeIcon
                id="about"
                onClick={(e) => editField(e)}
                style={{
                  marginLeft: "10px",
                  fontSize: "15px",
                  marginBottom: "3px",
                  cursor: "pointer",
                }}
                icon={faPencilAlt}
              />
            </p>
          </div>
        </StyledProfileTop>
        <div className="profile__bottom">
          <div className="profile__bottom-nav">
            <div
              className={`profile__bottom-nav-item ${markersMenu && "active"}`}
              onClick={() => setMarkersMenu(true)}
            >
              My Markers
            </div>
            <div
              className={`profile__bottom-nav-item ${!markersMenu && "active"}`}
              onClick={() => setMarkersMenu(false)}
            >
              Friends
            </div>
          </div>
          {markersMenu ? <MarkersList /> : <FriendsList />}
        </div>
      </div>
      <Footer />
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Profile);
