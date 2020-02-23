import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rating from '../rating'

function GiveVendorReview() {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(5)
    const [order, setOrder] = useState(5)
    const [allProducts, setAllProducts] = useState([])
    const [alreadyExists,setAlreadyExists]=useState("")
    let orderID = ""

    useEffect(() => {
        orderID = localStorage.getItem("DASS_ORDERID")
        axios.get('http://localhost:4000/order/' + orderID)
            .then(response => {
                setOrder(response.data)
                // also get the list of all the products
                axios.get('http://localhost:4000/product/getnames/')
                    .then(response => {
                        setAllProducts(response.data)
                    })
                // also get the vendor review and rating with the customer
                var userid = localStorage.getItem("DASS_USERID")
                const reviewDetails = {
                    customer: userid,
                    vendor: response.data.vendor
                }
                console.log("Sending ", reviewDetails)
                axios.post('http://localhost:4000/rating/view/', reviewDetails)
                    .then(response => {
                        console.log("Review:", response.data)
                        if (response.data[response.data.length - 1] != undefined) {
                            setReview(response.data[response.data.length - 1].review);
                            setRating(response.data[response.data.length - 1].rating);
                            setAlreadyExists(1)
                        }
                    })
            })
    }, []);

    function getPstatus(name) {
        if (name == "") {
            return ""
        }
        var results = allProducts.filter(function (i) {
            return i._id == name
        })
        if (results[0] == undefined) {
            return ""
        }
        return (results[0].status)
    }

    function givereview(e) {
        e.preventDefault();
        var userid = localStorage.getItem("DASS_USERID")
        const reviewDetails = {
            vendor: order.vendor,
            customer: userid,
            review: review,
            rating: rating
        }
        console.log("sending", reviewDetails, "ORDER ID", orderID)
        if(alreadyExists==0){
        axios.post('http://localhost:4000/rating/add/', reviewDetails).then(
            res => {
                document.getElementById("comments").innerHTML = "Reviewed successfully "
                document.getElementById("comments").className = "alert alert-success alert-dismissible fade show"
                window.location.replace('/orders')
            })
            .catch(function (error) {
                console.log(error);
                document.getElementById("comments").innerHTML = "Error"
                document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
            });
        }
        else{
            axios.put('http://localhost:4000/rating/add/', reviewDetails).then(
            res => {
                document.getElementById("comments").innerHTML = "Reviewed successfully "
                document.getElementById("comments").className = "alert alert-success alert-dismissible fade show"
                window.location.replace('/orders')
            })
            .catch(function (error) {
                console.log(error);
                document.getElementById("comments").innerHTML = "Error"
                document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
            });
        }
    }

    if (getPstatus(order.product) == "Dispatched" || getPstatus(order.product) == "Placed" || getPstatus(order.product) == "Cancelled") {

        return (
            <div>
                <h1>REVIEW AND RATE THIS VENDOR</h1>
                <form onSubmit={e => givereview(e)} >
                    <div className="form-group">
                        <label>Review: </label>
                        <input type="text"
                            className="form-control"
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Rating (0-5): </label>
                        <input type="text"
                            disabled="true"
                            value={rating}
                        />
                        <Rating
                            numberOfStars="5"
                            currentRating={rating}
                            onClick={e => setRating(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="REVIEW" className="btn btn-primary" />
                    </div>
                    <div id="comments">
                    </div>
                </form>
            </div>
        )
    }
    else {
        return (
            <div>

            </div>
        )
    }
}

export default GiveVendorReview