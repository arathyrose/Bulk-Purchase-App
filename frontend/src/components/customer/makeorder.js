import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MakeOrder(props) {

    let productID = ""
    const [product, setProduct] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [allUsers, setAllUsers] = useState([])
    const [allRatings, setAllRatings] = useState([])
    

    useEffect(() => {
        productID = localStorage.getItem("DASS_ITEMID")
        console.log("PID:", productID)
        axios.get('http://localhost:4000/product/' + productID)
            .then(response => {
                setProduct(response.data)
                console.log(response.data)
                console.log(response.data.images)

                if (response.data.images != "" || response.data.images != [] || response.data.images != undefined) {
                    document.getElementById("images").innerHTML = "<br /><h1>IMAGES</h1><img src=" + response.data.images + " class=\"img-fluid.max-width: 100% height: auto rounded mx-auto d-block\"  >"
                }
            })
        axios.get('http://localhost:4000/user/getnames/')
            .then(response => {
                setAllUsers(response.data)
            })
        axios.get('http://localhost:4000/avg_rating/')
            .then(response => {
                setAllRatings(response.data)
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

    function order(e) {
        e.preventDefault();
        if (product.status != "Waiting") {
            document.getElementById("comments").innerHTML = "This product is not available for delivery"
            document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
        }
        else if (product.quantity_remaining < quantity) {
            document.getElementById("comments").innerHTML = "Please choose a smaller quantity"
            document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
        }
        else if (quantity == 0) {
            document.getElementById("comments").innerHTML = "Choose at least 1 quantity to order"
            document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
        }
        else {
            a = localStorage.getItem("DASS_USERID")
            productID = localStorage.getItem("DASS_ITEMID")
            const orderDetails = {
                product: productID,
                quantity: quantity,
                vendor: product.vendor,
                customer: a
            }
            const order_decrement = {
                order_value: quantity
            }
            var a = 0
            console.log("sending", orderDetails)
            axios.post('http://localhost:4000/order/add', orderDetails)
                .then(res => {
                    document.getElementById("comments").innerHTML = "Ordered successfully"
                    document.getElementById("comments").className = "alert alert-success alert-dismissible fade show"
                    axios.put('http://localhost:4000/product/order_decrement/' + productID, order_decrement)
                        .then(res => {
                            window.location.replace('/orders')
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <div>
            <div>
                <h1>PRODUCT DETAILS</h1>
                <table className="table table-hover table-responsive-lg ">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td> {product.name} </td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td> {product.price} </td>
                        </tr>
                        <tr>
                            <th>Vendor</th>
                            <td>{(() => getname(product.vendor))()}</td>
                        </tr>
                        <tr>
                            <th>Total Quantity for Dispatch</th>
                            <td> {product.total_quantity} </td>
                        </tr>
                        <tr>
                            <th>Quantity remaining for Dispatch</th>
                            <td> {product.quantity_remaining} </td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td> {product.description} </td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td> {product.status} </td>
                        </tr>
                        <tr>
                            <th>Vendor rating</th>
                            <td> {(() => get_rating(product.vendor))()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="images"> 
            </div>
            <br />

            <div>
                <h1>ORDER NOW</h1>
                <form onSubmit={e => order(e)} >
                    <div className="form-group">
                        <label>Quantity to order: </label>
                        <input type="text"
                            className="form-control"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="ORDER NOW" className="btn btn-primary" />
                    </div>
                    <div id="comments">
                    </div>
                </form>
            </div>
        </div>
    )
}
export default MakeOrder;