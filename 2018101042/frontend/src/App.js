import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';

import LoginPage from './components/login/loginpage'
import CustomerPage from './components/customer/app'
import VendorPage from './components/vendor/app'
function App() {
  const [ID, setID] = useState("0");
  const [type, setType] = useState("0")
  //setID(localStorage.getItem('DASS_USERID'))

  //let a = localStorage.getItem('DASS_USERID')
  useEffect(() => {

    // Update the document title using the browser API
    let a = localStorage.getItem('DASS_USERID')
    console.log("a:", a)
    if (!a || a == 0 || a == "") { setID("0"); localStorage.setItem('DASS_USERID', ''); }
    else {
      setID(a)
      axios.get('http://localhost:4000/user/get_type/' + a)
        .then(response => {
          console.log(response.data)
          setType(response.data)
          if (response.data == "")
           { setID("0"); localStorage.setItem('DASS_USERID', '');}
        })
    }
  }, []);
  
  if (ID == "0") {
    return (
      <LoginPage setID={setID} />
    );
  }
  else {
    // find the type of the user

    if ( type  == "Customer")
      return (
        <CustomerPage setID={setID} />
      )
    else if ( type  == "Vendor")
      return (
        <VendorPage setID={setID} />
      )
      else{
        return (
          <LoginPage setID={setID} />
        );
      }
  }

}


export default App;
