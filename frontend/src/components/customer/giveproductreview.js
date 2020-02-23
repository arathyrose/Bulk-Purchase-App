import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rating from '../rating'

function GiveProductReview() {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(5)
    const [order, setOrder] = useState(5)
    const [allProducts, setAllProducts] = useState([])
    let orderID = ""

    useEffect(() => {
        orderID = localStorage.getItem("DASS_ORDERID")
        axios.get('http://localhost:4000/order/' + orderID)
            .then(response => {
                setOrder(response.data);
                setReview(response.data.review)
                setRating(response.data.rating)               
                // also get the list of all the products
                axios.get('http://localhost:4000/product/getnames/')
                    .then(response => {
                        setAllProducts(response.data)
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
        orderID = localStorage.getItem("DASS_ORDERID")
        const reviewDetails = {
            review: review,
            rating: rating
        }
        axios.put('http://localhost:4000/order/review/' + orderID, reviewDetails).then(
            res => {
                document.getElementById("comments").innerHTML = "Reviewed successfully"
                document.getElementById("comments").className = "alert alert-success alert-dismissible fade show"
            })
            .catch(function (error) {
                console.log(error);
                document.getElementById("comments").innerHTML = "Error"
                document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
            });
    }

    if (getPstatus(order.product) == "Dispatched") {
        return (
            <div>
                <h1>REVIEW AND RATE THIS PRODUCT</h1>
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

 export default GiveProductReview