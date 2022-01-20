import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed";
import LikedFeed from "./components/LikedFeed";

function BrowserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeFeed />} />
      <Route path="/home" element={<HomeFeed />} />
      <Route path="/liked" element={<LikedFeed />} />
    </Routes>
  );
}

export default BrowserRoutes;
