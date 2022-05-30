import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import ProfilePage from "@pages/profile/ProfilePage";
import NewsFeed from "@pages/news-feed/NewsFeed";
import NotFound from "@pages/not-found/NotFound";
import PrivateRoute from "./PrivateRoute";

function MainRoutes() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route
          path='/feeds'
          element={
            <PrivateRoute>
              <NewsFeed />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<LoginPage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
}

export default MainRoutes;
