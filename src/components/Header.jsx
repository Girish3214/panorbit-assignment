import React, { useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../store/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/header.css";
function Header() {
  const { pathname } = useLocation();

  const { sidebarElements, selectedUser, setSelectedUserDetails } =
    useGlobalContext();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const selectedTab = useMemo(() => {
    const selected = sidebarElements.filter((item) =>
      item.link?.includes(pathname)
    )[0];
    return selected.title;
  }, [pathname]);

  const handleSignout = () => {
    setModalOpen(false);
    setSelectedUserDetails({});
    navigate("/");
  };

  useEffect(() => {
    setModalOpen(false);

    return () => {};
  }, [pathname]);

  return (
    <div className="header__container">
      <div className="nav__section">
        <div className="title__section">
          <h1>{selectedTab}</h1>
        </div>
        <div
          className="profile__section"
          onClick={() => setModalOpen((prev) => !prev)}
        >
          <img src={selectedUser.profilepicture} alt={selectedUser.name} />
          <h6>{selectedUser.name}</h6>

          {modalOpen && (
            <div className="user__details">
              <div className="modal__user--details">
                <img
                  src={selectedUser.profilepicture}
                  alt={selectedUser.name}
                />
                <h6>{selectedUser.name}</h6>
                <p>{selectedUser.email}</p>
              </div>
              <div className="signout__container">
                <button onClick={() => handleSignout()}>Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
