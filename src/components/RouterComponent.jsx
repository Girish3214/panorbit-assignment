import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "./Spinner";
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const ComingSoonPage = lazy(() => import("../pages/ComingSoon/ComingSoonPage"));
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage"));

function RouterComponent() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </Suspense>
  );
}

export default RouterComponent;
