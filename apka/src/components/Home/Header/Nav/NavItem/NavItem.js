import React from "react";
import "./NavItem.css";

import { useHistory } from "react-router";
import PropTypes from "prop-types";

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

NavItem.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};

export default NavItem;
