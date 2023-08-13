import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ComingSoonPage from "../pages/ComingSoon/ComingSoonPage";
import ProfilePage from "../pages/Profile/ProfilePage";

function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  );
}

export default RouterComponent;
