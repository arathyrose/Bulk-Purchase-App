import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function ViewVendors() {
    let vendorID = ""
    const [allVendors, setAllVendors] = useState([])
    const [allRatings, setAllRatings] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/vendor/showall')
            .then(response => {
                console.log(response.data)
                setAllVendors(response.data)
            })
              // also get the list of all ratings
              axios.get('http://localhost:4000/avg_rating/')
              .then(response => {
                  setAllRatings(response.data)
              })
    }, []);

    function get_rating(name) {
        if (name == "") {
            return 0
        }
        var results = allRatings.filter(function (i) {
            return i._id == name
        })
        if (results[0] == undefined) {
            return 0
        }
        console.log(results)
        return (results[0].avgRating)
    }

    function viewmore(e) {
        vendorID = e
        localStorage.setItem("DASS_VENDORID", vendorID)
        console.log(vendorID)
        window.location.replace("/vendor_details")
    }

    return (
        <div>
            <table className="table table-hover thead-light table-responsive-lg ">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Average Rating</th>
                        <th>View More Details!</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        { allVendors }.allVendors.map((currentVendor, i) => {
                            return (
                                <tr>
                                    <td>{currentVendor.username}</td>
                                    <td>{(() => get_rating(currentVendor._id))()}</td>
                                    <td><Button variant="primary" onClick={() => viewmore(currentVendor._id)} value={currentVendor._id}>View More Details</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default ViewVendors;