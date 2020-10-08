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
<<<<<<< HEAD
          <Route path="/watchpage" component={WatchPage} />
          <Route path="/" component={homepage} />
=======
          <Route path="/addFriendPage" component={AddFriendPage} />  
          <Route path="/" component={WatchPage} />
          
>>>>>>> f68548f6057151b8f1e31cb1e40c8a9eb5516952
        </Switch>
      </Router>
    );
  };
  
  export default MainRoute; 