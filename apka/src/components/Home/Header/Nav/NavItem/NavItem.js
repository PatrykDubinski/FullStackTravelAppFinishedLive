import React from "react";
import "./NavItem.css";

import { useHistory } from "react-router";

const NavItem = ({ path, children }) => {
  const history = useHistory();
  const onNavClick = (path) => {
    history.push({
      pathname: `/${path}`,
      state: {
        addingMarker: true,
      },
    });
  };

  return (
    <li onClick={() => onNavClick(path)} className="navItem">
      {children}
    </li>
  );
};

export default NavItem;
