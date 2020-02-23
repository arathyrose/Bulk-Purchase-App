import React from 'react'

function Logout(props) {
    localStorage.removeItem('DASS_USERID')
    localStorage.setItem('DASS_USERID', "")
    return (
        <div>
            <h1>You have successfully logged out</h1>
            <a href="/login"><p>Click here to go to the login page </p></a>
        </div>
    )
}
export default Logout
