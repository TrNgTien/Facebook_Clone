//Packages
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WatchPage from "../pages/app/WatchPage";




const MainRoute = () => {
    return (
      <Router>
        <Switch>
          <Route path="/" component={WatchPage} />
          
        </Switch>
      </Router>
    );
  };
  
  export default MainRoute; 