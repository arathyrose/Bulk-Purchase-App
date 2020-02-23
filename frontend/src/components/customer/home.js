import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';

function Home() {
    const [ID, setID] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        let a = localStorage.getItem('DASS_USERID')
        if (!a || a == 0|| a==""|| a=="0")
            setID("")
        else {
            setID(a)
            axios.get('http://localhost:4000/user/' + a)
                .then(response => {
                    setName(response.data.username)
                })
        }
    }
    )
    return (
        <div>
            <h1>Welcome {name}, you are a customer. Choose what you want to do from the nav bar</h1>
        </div>
    );
}

export default Home;