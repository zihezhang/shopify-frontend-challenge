import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./components/HomeFeed";
import LikedFeed from "./components/LikedFeed";

function BrowserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/home" element={<Feed />} />
      <Route path="/liked" element={<LikedFeed />} />
    </Routes>
  );
}

export default BrowserRoutes;
