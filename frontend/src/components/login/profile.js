import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ViewProfile() {

    let userID = ""
    const [user, setUser] = useState("")
    useEffect(() => {
        userID = localStorage.getItem("DASS_USERID")
        axios.get('http://localhost:4000/user/' + userID)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            })
    }, [])

    return (
        <div>
            <h1>PROFILE DETAILS</h1>
            <table className="table table-responsive-lg table-hover">
                <tbody>
                    <tr>
                        <th> Username </th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th> Email    </th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th> Address  </th>
                        <td>{user.address}</td>
                    </tr>
                    <tr>
                        <th> Phone    </th>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <th> Type     </th>
                        <td>{user.type}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default ViewProfile
