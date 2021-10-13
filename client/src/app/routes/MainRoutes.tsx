import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
function MainRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default MainRoutes;
