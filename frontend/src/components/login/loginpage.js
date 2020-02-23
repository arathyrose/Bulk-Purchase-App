import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './show_all_users'
import RegisterUser from './register'
import LoginUser from './login'
import TopBar from './topbar'

function LoginPage() {
    return (
        <Router>
            <div className="container">
                <TopBar />
                <br />
                <Route path="/register" component={RegisterUser} />
                <Route path="/login" component={LoginUser} />
                {/*   <Route path="/user/showall" exact component={UsersList} /> */}
                {/* The above statement is activated only for testing purposes */}
            </div>
        </Router>
    )
}


export default LoginPage
