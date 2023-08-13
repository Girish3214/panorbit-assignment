import React, { useEffect } from "react";
import Container from "../components/Container";
import { useGlobalContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

import "../styles/profilePage.css";
import GMap from "../components/GMap";
function ProfilePage() {
  const navigate = useNavigate();
  const { selectedUser } = useGlobalContext();

  useEffect(() => {
    if (Object.entries(selectedUser).length === 0) {
      navigate("/");
      return;
    }
    return () => {};
  }, []);

  return (
    <Container>
      <div className="profile__container">
        <div className="profile__user--details">
          <div className="user__image__section">
            <div className="profile__image__container">
              <img src={selectedUser.profilepicture} alt={selectedUser.name} />
              <h6>{selectedUser.name}</h6>
            </div>
            <div className="profile__user__details">
              <p>
                <b>
                  <span>Username</span>:
                </b>
                {selectedUser?.username ?? ""}
              </p>
              <p>
                <b>
                  <span>e-mail</span>:
                </b>
                {selectedUser?.email ?? ""}
              </p>
              <p>
                <b>
                  <span>Phone</span>:
                </b>
                {selectedUser?.phone?.split(" ")[0] ?? ""}
              </p>
              <p>
                <b>
                  <span>Website</span>:
                </b>
                {selectedUser?.website ?? ""}
              </p>
            </div>
          </div>
          <div className="user__company">
            <div className="company__heading">Company</div>
            <div className="user__company__details">
              <p>
                <b>
                  <span>Name</span>:
                </b>
                {selectedUser?.company?.name ?? ""}
              </p>
              <p>
                <b>
                  <span>catchphrase</span>:
                </b>
                {selectedUser?.company?.catchPhrase ?? ""}
              </p>
              <p>
                <b>
                  <span>bs</span>:
                </b>
                {selectedUser?.company?.bs ?? ""}
              </p>
            </div>
          </div>
        </div>
        <div className="user__location__details">
          <div className="address__container">
            <h6 className="address__heading">Address:</h6>
            <div className="user__address__details">
              <p>
                <b>
                  <span>Street</span>:
                </b>
                {selectedUser?.address?.street ?? ""}
              </p>
              <p>
                <b>
                  <span>Suite</span>:
                </b>
                {selectedUser?.address?.suite ?? ""}
              </p>
              <p>
                <b>
                  <span>City</span>:
                </b>
                {selectedUser?.address?.city ?? ""}
              </p>
              <p>
                <b>
                  <span>Zip</span>:
                </b>
                {selectedUser?.address?.zipcode ?? ""}
              </p>
            </div>
          </div>
          <div className="map__container">
            <GMap location={selectedUser?.address?.geo} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProfilePage;
