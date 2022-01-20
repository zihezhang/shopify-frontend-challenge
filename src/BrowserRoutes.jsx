import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed";
import LikedFeed from "./components/LikedFeed";
import RedirectPage from "./components/RedirectPage";

function BrowserRoutes({ toggleToastActive }) {
  return (
    <Routes>
      <Route path="/" element={<HomeFeed />} />
      <Route
        path="/home"
        element={<HomeFeed toggleToastActive={toggleToastActive} />}
      />
      <Route
        path="/liked"
        element={<LikedFeed toggleToastActive={toggleToastActive} />}
      />
      <Route path="/redirect-github" element={<RedirectPage />} />
    </Routes>
  );
}

export default BrowserRoutes;
