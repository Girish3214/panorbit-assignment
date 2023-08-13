import React from "react";
import Container from "../../components/Container";
import Wave1 from "../../assets/svg/wave1.svg";
import Wave2 from "../../assets/svg/wave2.svg";

import "./homePage.css";
import { useGlobalContext } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { usersData, setSelectedUserDetails } = useGlobalContext();
  const navigate = useNavigate();

  const handleUserSelection = (newUser) => {
    setSelectedUserDetails(newUser);
    navigate("/profile");
  };
  return (
    <Container>
      <div className="images__container">
        <div>
          <img src={Wave1} alt="svg" />
          <img src={Wave2} alt="svg" />
        </div>
      </div>
      <div className="users__container">
        <div className="users__header">
          <h6>Select an account</h6>
        </div>
        <div style={{ height: "6rem", width: "100%" }} />
        <div className="users__list--container">
          {usersData.map((user) => (
            <div
              key={user.id + user.email}
              className="users__list--item"
              onClick={() => handleUserSelection(user)}
            >
              <img src={user.profilepicture} alt={user.name} />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
