import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VendorDetails(props) {
    let vendorID = ""
    const [vendor, setVendor] = useState("")
    const [allRatings, setAllRatings] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        vendorID = localStorage.getItem("DASS_USERID")
        console.log("PID:", vendorID)
        axios.get('http://localhost:4000/user/' + vendorID)
            .then(response => {
                console.log(response.data)
                setVendor(response.data);
                axios.get('http://localhost:4000/rating/vendor/' + vendorID)
                    .then(response => {
                        console.log(response.data)
                        setAllRatings(response.data);
                    })
            })
        // also get the list of all the users
        axios.get('http://localhost:4000/user/getnames/')
            .then(response => {
                setAllUsers(response.data)
            })
    }, []);

    function getname(name) {
        if (name == "") {
            return ""
        }
        var results = allUsers.filter(function (i) {
            return i._id == name
        })
        if (results[0] == undefined) {
            return ""
        }
        return (results[0].username)
    }

    const RatingTable = (ratings) => {
        console.log("RATINGS", ratings)
        console.log("Ratings: ", { ratings }.ratings.ratings)
        if (ratings == [] || ratings == undefined || ratings.ratings[0] == undefined) {
            return (
                <div>No ratings have been made</div>
            )
        }

        else {
            return (
                <div>
                    <table className="table table-hover thead-light table-responsive-lg ">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Rating</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                { ratings }.ratings.ratings.map((currentRating, i) => {
                                    return (
                                        <tr>
                                            <td>{(() => getname(currentRating.customer))()}</td>
                                            <td>{currentRating.rating}</td>
                                            <td>{currentRating.review}</td>
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

    return (
        <div>
            <h1>RATINGS</h1>
            <RatingTable ratings={allRatings} />
        </div>
    )
}

export default VendorDetails;