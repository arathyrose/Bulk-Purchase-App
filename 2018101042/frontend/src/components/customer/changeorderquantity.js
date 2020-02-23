import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rating from '../rating'

function ChangeOrderQuantity(e) {
    const [order, setOrder] = useState(5)
    const [allProducts, setAllProducts] = useState([])
    const [newQuantity, setNewQuantity] = useState("")
    let orderID = ""

    useEffect(() => {
        orderID = localStorage.getItem("DASS_ORDERID")
        axios.get('http://localhost:4000/order/' + orderID)
            .then(response => {
                setOrder(response.data);
                setNewQuantity(response.data.quantity)
                // also get the list of all the products
                axios.get('http://localhost:4000/product/showall/')
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

    function getPremaining(name) {
        if (name == "") {
            return ""
        }
        var results = allProducts.filter(function (i) {
            return i._id == name
        })
        if (results[0] == undefined) {
            return ""
        }
        return (results[0].quantity_remaining)
    }

    function changeOrderQuantity(e) {
        e.preventDefault();
        orderID = localStorage.getItem("DASS_ORDERID")
        const reviewDetails = {
            newQuantity: newQuantity,
        }
        const order_decrement = {
            order_value: newQuantity - order.quantity
        }
        if (newQuantity > getPremaining(order.product) + order.quantity) {
            console.log(newQuantity, getPremaining(order.product) + order.quantity)
            document.getElementById("comments2").innerHTML = "Order a smaller amount"
            document.getElementById("comments2").className = "alert alert-danger alert-dismissible fade show"
        }
        else {
            axios.put('http://localhost:4000/order/change_quantity/' + orderID, reviewDetails).then(
                res => {
                    axios.put('http://localhost:4000/product/order_decrement/' + order.product, order_decrement)
                        .then(res => {
                            document.getElementById("comments2").innerHTML = "Changed successfully"
                            document.getElementById("comments2").className = "alert alert-success alert-dismissible fade show"
                            window.location.replace("/orders")
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                    document.getElementById("comments2").innerHTML = "Error"
                    document.getElementById("comments2").className = "alert alert-danger alert-dismissible fade show"
                });
        }
    }

    if (getPstatus(order.product) == "Waiting") {
        return (
            <div>
                <h1>CHANGE QUANTITY OF ORDER</h1>
                <form onSubmit={e => changeOrderQuantity(e)} >
                    <div className="form-group">
                        <label>New Quantity: </label>
                        <input type="text"
                            className="form-control"
                            value={newQuantity}
                            onChange={e => setNewQuantity(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="CHANGE" className="btn btn-primary" />
                    </div>
                    <div id="comments2">
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

export default ChangeOrderQuantity