import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function Login(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(e) {
        e.preventDefault()
        const loginDetails = {
            username: { username }.username,
            password: window.btoa({ password }.password)
        }
        var a = 0
        axios.post('http://localhost:4000/user/login', loginDetails)
            .then(
                res => {
                    a = res.data
                    if (a === 0) {
                        document.getElementById("comments").className = "alert alert-danger"
                        document.getElementById("comments").innerText = "Invalid username/password"
                        localStorage.setItem('DASS_USERID', 0)
                    }
                    else {
                        document.getElementById("comments").className = "alert alert-success"
                        document.getElementById("comments").innerText = "Successful login!"
                        localStorage.setItem('DASS_USERID', a)
                        // props.setID(a)
                        window.location.replace("/home")
                    }
                })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <form onSubmit={e => handleLogin(e)} >
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="LOGIN" className="btn btn-primary" />
                </div>
                <div id="comments">
                </div>
            </form>
        </div>
    )
}
export default Login

