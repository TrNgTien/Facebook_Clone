import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import GeneralChat from "@pages/chatting/GeneralChat";
import ProfilePage from "@pages/profile/ProfilePage";
import Feeds from "@pages/main-feeds/Feeds";
import NotFound from "@pages/not-found/NotFound";
import UploadInput from "@pages/main-feeds/components/upload/upload-input/UploadInput";
import PrivateRoute from "./PrivateRoute";

function MainRoutes() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/chatting'
          element={
            <PrivateRoute>
              <GeneralChat />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/feeds'
          element={
            <PrivateRoute>
              <Feeds />
            </PrivateRoute>
          }
        ></Route>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<LoginPage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/upload' element={<UploadInput />} />
        </Routes>
      )}
    </>
  );
}

export default MainRoutes;
