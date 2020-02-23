import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GiveVendorReview from './givevendorreview'
import GiveProductReview from './giveproductreview'
import ChangeQuantity from './changeorderquantity'

function GiveReview(props) {
    let orderID = ""
    const [order, setOrder] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        orderID = localStorage.getItem("DASS_ORDERID")
        axios.get('http://localhost:4000/order/' + orderID)
            .then(response => {
                setOrder(response.data);
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


    return (
        <div>
            <div>
                <h1>ORDER DETAILS</h1>
                <table className="table table-hover table-responsive-lg">
                    <tbody>
                        <tr>
                            <th>Product</th>
                            <td> {(() => getPname(order.product))()}</td>
                        </tr>
                        <tr>
                            <th>Quantity</th>
                            <td> {order.quantity} </td>
                        </tr>
                        <tr>
                            <th>Vendor</th>
                            <td>{(() => getname(order.vendor))()}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td> {(() => getPstatus(order.product))()} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <GiveProductReview />
            <GiveVendorReview />
            <ChangeQuantity />
        </div >
    )
}

export default GiveReview;