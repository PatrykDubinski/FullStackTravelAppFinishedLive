import React from "react";
import "./Header.css";

import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import Nav from "./Nav/Nav";

const Header = React.memo(({ profile }) => {
  return (
    <div className="header">
      <div className="header__left">
        <Logo />
        <h1>Travel History App</h1>
      </div>
      <Nav profile={profile} />
    </div>
  );
});

export default Header;