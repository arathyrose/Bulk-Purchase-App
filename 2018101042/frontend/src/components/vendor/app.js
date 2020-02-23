import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Addproduct from './addproduct'
import Products from "./viewAllProducts"
import VendorNavBar from '../vendor/navbar'
import LogOut from '../login/logout'
import Home from './home'
import Profile from '../login/profile'
import ActionDispatch from './actiondispatch'
import AllRatings from './allRatings'
function VendorPage() {
  return (
    <Router>
      <div className="container">
        <VendorNavBar />
        <br />
        <Route path="/home" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/addproduct" component={Addproduct} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={LogOut} />
        <Route path="/action" component={ActionDispatch} />
        <Route path="/ratings" component={AllRatings}/>
      </div>
    </Router>
  );
}

export default VendorPage;
