import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import GeneralChat from "../pages/chatting/GeneralChat";
import QuestionMatching from "../pages/matching/QuestionMatching";
import ProfilePage from "../pages/profile/ProfilePage";
import Feeds from "../pages/main-feeds/Feeds";
import NotFound from "../pages/not-found/NotFound";
function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chatting" element={<GeneralChat />} />
      <Route path="/matching" element={<QuestionMatching />} />
      <Route path="/feeds" element={<Feeds />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
