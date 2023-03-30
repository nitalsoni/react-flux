import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeLink = { color: "orange" };
  return (
    <nav>
      <NavLink to="/" exact={true} activeStyle={activeLink}>
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink to="/courses" activeStyle={activeLink}>
        Course
      </NavLink>{" "}
      |{" "}
      <NavLink to="/about" activeStyle={activeLink}>
        About
      </NavLink>
    </nav>
  );
}

export default Header;
