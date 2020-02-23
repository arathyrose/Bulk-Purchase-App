import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function ViewOrders(props) {
    let orderID = ""
    const [ID, setID] = useState("");
    const [order, setOrder] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        let a = localStorage.getItem('DASS_USERID')
        if (!a || a == 0)
            setID("")
        else
            setID(a)
        axios.get('http://localhost:4000/order/customer/' + a)
            .then(response => {
                console.log(response.data)
                setOrder(response.data);
            })
        // also get the list of all the users
        axios.get('http://localhost:4000/user/getnames/')
            .then(response => {
                setAllUsers(response.data)
            })
        // also get the list of all the products
        axios.get('http://localhost:4000/product/getnames/')
            .then(response => {
                setAllProducts(response.data)
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

    function getPname(name) {
        if (name == "") {
            return ""
        }
        var results = allProducts.filter(function (i) {
            return i._id == name
        })
        if (results[0] == undefined) {
            return ""
        }
        return (results[0].name)
    }

    function getPstatus(name){
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

    function giveReview(e) {
        orderID = e
        localStorage.setItem("DASS_ORDERID", orderID)
        console.log(orderID)
        window.location.replace("/givereview")
    }

    return (
        <div>
            <table className="table table-hover thead-light table-responsive-lg ">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Vendor</th>
                        <th>Status</th>
                        <th>Give Rating/Review</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        { order }.order.map((currentOrder, i) => {
                            return (
                                <tr>
                                    <td> {(() => getPname(currentOrder.product))()}</td>
                                    <td>{currentOrder.quantity}</td>
                                    <td>{(() => getname(currentOrder.vendor))()}</td>
                                    <td>{(() => getPstatus(currentOrder.product))()}</td>
                                    <td><Button variant="primary" onClick={() => giveReview(currentOrder._id)} value={currentOrder._id}>View more details</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default ViewOrders;