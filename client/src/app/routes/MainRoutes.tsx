import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import GeneralChat from "../pages/chatting/GeneralChat";
import QuestionMatching from "../pages/matching/QuestionMatching";
import ProfilePage from "../pages/profile/ProfilePage";
function MainRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/chatting" component={GeneralChat} />
        <Route exact path="/matching" component={QuestionMatching} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default MainRoutes;
