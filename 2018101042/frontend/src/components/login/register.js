import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            type: 'Vendor'
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangeType = this.onChangeType.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value })
    }
    onChangeEmail(event) {
        this.setState({ email: event.target.value })
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value })
    }
    onChangeAddress(event) {
        this.setState({ address: event.target.value })
    }
    onChangePhone(event) {
        this.setState({ phone: event.target.value })
    }
    onChangeType(event) {
        let type_dd = document.getElementById("type_dd")
        this.setState({ type: type_dd.options[type_dd.selectedIndex].innerHTML })
    }

    onSubmit(e) {
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: window.btoa(this.state.password),
            address: this.state.address,
            phone: this.state.phone,
            type: this.state.type
        }
        axios.post('http://localhost:4000/user/register', newUser)
            .then(res => {
                if (res.status == 200) {
                    this.setState({
                        username: '',
                        email: '',
                        password: '',
                        address: '',
                        phone: '',
                        type: 'Vendor'
                    })
                    document.getElementById("comments").innerHTML = "Error"
                    document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
                }
                else{
                    document.getElementById("comments").innerHTML = "Success"
                document.getElementById("comments").className = "alert alert-success alert-dismissible fade show"
                                console.log(res.data)
                window.location.replace("/login")
                }
            })
            .catch(err=>{
                document.getElementById("comments").innerHTML = "Error"
                document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            className="form-control"
                            required="true"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            required="true"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            className="form-control"
                            required="true"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <textarea
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select
                            id='type_dd'
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType}
                        >
                            <option value='Vendor' selected>Vendor</option>
                            <option value='Customer' >Customer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                    <div id="comments">
                    </div>
                </form>
            </div>
        )
    }
}