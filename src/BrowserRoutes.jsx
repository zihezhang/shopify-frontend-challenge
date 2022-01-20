import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import LikedFeed from "./components/LikedFeed";

function BrowserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      {/* <Feed /> */}
      {/* </Route> */}
      <Route path="/home" element={<Feed />} />
      {/* <Feed />
      </Route> */}
      <Route path="/liked" element={<LikedFeed />} />
      {/* <LikedFeed />
      </Route> */}
    </Routes>
  );
}

export default BrowserRoutes;
