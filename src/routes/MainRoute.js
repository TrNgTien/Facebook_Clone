//Packages
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import homepage from "../pages/app/homepage";
import WatchPage from "../pages/app/WatchPage";
import AddFriendPage from "../pages/app/AddFriendPage";



const MainRoute = () => {
    return (
      <Router>
        <Switch>
          <Route path ="/addFriend" component={AddFriendPage}/>
          <Route path="/watchpage" component={WatchPage} />
          <Route path="/" component={homepage} />
        </Switch>
      </Router>
    );
  };
  
  export default MainRoute; 