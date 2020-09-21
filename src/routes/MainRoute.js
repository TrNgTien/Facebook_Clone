//Packages
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WatchPage from "../pages/app/WatchPage";
import AddFriendPage from "../pages/app/AddFriendPage";



const MainRoute = () => {
    return (
      <Router>
        <Switch>
          <Route path="/addFriendPage" component={AddFriendPage} />  
          <Route path="/" component={WatchPage} />
          
        </Switch>
      </Router>
    );
  };
  
  export default MainRoute; 