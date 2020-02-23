import React, { Component } from 'react'
import axios from 'axios'

export default class UsersList extends Component {

    constructor(props) {
        super(props)
        this.state = { users: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/showall')
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <table className="table table-hover thead-light table-responsive-lg">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td>{currentUser.username}</td>
                                        <td>{currentUser.password}</td>
                                        <td>{currentUser.email}</td>
                                        <td>{currentUser.address}</td>
                                        <td>{currentUser.phone}</td>
                                        <td>{currentUser.type}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}