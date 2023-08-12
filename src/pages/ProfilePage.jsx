import React, { useEffect } from "react";
import Container from "../components/Container";
import { useGlobalContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

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

  return <Container>{selectedUser.name}</Container>;
}

export default ProfilePage;
