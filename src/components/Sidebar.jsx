import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

import Arrow from "../assets/icons/next.png";
import { useGlobalContext } from "../store/UserContext";

function Sidebar() {
  const { sidebarElements } = useGlobalContext();
  return (
    <div className="sidebar__container">
      {sidebarElements.map((item) => (
        <div key={item.title}>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
            to={item.link}
          >
            {item.title}
            <div className="arrow__container">
              <div className="emptyDiv" />
              <img src={Arrow} alt="" className="arrowIcon" />
            </div>
            <b />
            <b />
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
