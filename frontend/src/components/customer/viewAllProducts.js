import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js'
import { Button } from 'react-bootstrap';

function ViewProducts(props) {
    let productID = ""
    const [ID, setID] = useState("0");
    const [product, setProduct] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [searchString, setSearchString] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [sortPrice, setSortPrice] = useState(0) // 0 for no sort, 1 for ascending, 2 for descending
    const [sortRating, setSortRating] = useState(0)// 0 for no sort, 1 for ascending, 2 for descending
    const [allRatings, setAllRatings] = useState([])
    const [updateNow, setUpdateNow] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:4000/product/showallwaiting')
            .then(res => {
                //   console.log(res.data)
                setAllProducts(res.data)
                setProduct(res.data)
                // also get the list of all the users
                axios.get('http://localhost:4000/user/getnames/')
                    .then(response => {
                        //    console.log("users", response.data)
                        setAllUsers(response.data)
                    })
                // also get the list of all ratings
                axios.get('http://localhost:4000/avg_rating/')
                    .then(response => {
                        setAllRatings(response.data)
                    })
            })
    }, []);

    function getname(name) {
        // console.log("NAME", name)
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

    function GetSortOrderPrice(order) {
        return function (a, b) {
            if (a["price"] > b["price"]) {
                if (order == 1)//ascending
                    return 1;
                else
                    return -1
            }
            else if (a["price"] < b["price"]) {
                if (order == 1)//ascending
                    return -1;
                else
                    return 1;
            }
            return 0;
        }
    }

    function GetSortOrderRating(order) {
        return function (a, b) {
            let a_rating = get_rating(a["vendor"])
            let b_rating = get_rating(b["vendor"])
            if (a_rating > b_rating) {
                if (order == 1)//ascending
                    return 1;
                else
                    return -1
            }
            else if (a_rating < b_rating) {
                if (order == 1)//ascending
                    return -1;
                else
                    return 1;
            }
            return 0;
        }
    }

    function updateList(e) {
        e.preventDefault();
        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "name"
            ]
        };
        var fuse = new Fuse(allProducts, options); // "list" is the item array
        var results = fuse.search(searchString);

        //   console.log(searchString, sortPrice, sortRating)
        /*  var results = allProducts.filter(function (i) {
             return i.name.indexOf(searchString) !== -1;
         }) */
        //  console.log(results)
        if (searchString == "") {
            results = allProducts
        }
        // for the sort in ascending and descending
        results.sort(GetSortOrderPrice(sortPrice))//1 for ascending 2 for descending
        results.sort(GetSortOrderRating(sortRating))
        setProduct(results)
        setUpdateNow(2)
        // console.log(product)
    }

    function makeOrder(e) {
        productID = e
        localStorage.setItem("DASS_ITEMID", productID)
        //   console.log(productID)
        window.location.replace("/makeorder")
    }

    function helper() {
        setUpdateNow(10)
    }

    return (
        <div>
            <div>
                <form onSubmit={e => updateList(e)} >
                    <div className="form-group">
                        <label>Search Product: </label>
                        <input type="text"
                            className="form-control"
                            value={searchString}
                            onChange={e => setSearchString(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Sort by Price:   </label>
                        <input type="radio"
                            /* className="form-control" */
                            value="PriceAscending"
                            name="Price"
                            onChange={e => setSortPrice(1)}
                        />Ascending
                        <input type="radio"
                            /* className="form-control" */
                            name="Price"
                            value="PriceDescending"
                            onChange={e => setSortPrice(2)}
                        />Descending
                    </div>
                    <div className="form-group">
                        <label>Sort by Rating:   </label>
                        <input type="radio"
                            /* className="form-control" */
                            value="RatingAscending"
                            name="Rating"
                            onChange={e => setSortRating(1)}
                        />Ascending
                        <input type="radio"
                            /* className="form-control" */
                            value="RatingDescending"
                            name="Rating"
                            onChange={e => setSortRating(2)}
                        />Descending
                    </div>

                    <div className="form-group">
                        <input type="submit" value="SEARCH" className="btn btn-primary" />
                        <button type="button" onClick={helper} className="btn btn-warning"> Update values </button>
                    </div>

                </form>
            </div>

            <div>
                <table className="table table-hover thead-light table-responsive-lg ">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Vendor</th>
                            <th>Total Quantity for Dispatch</th>
                            <th>Quantity remaining for Dispatch</th>
                            <th>Description</th>
                            <th>Vendor rating</th>
                            <th>Order Now!</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            { product }.product.map((currentProduct, i) => {
                                return (
                                    <tr>
                                        <td>{currentProduct.name}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>{(() => getname(currentProduct.vendor))()}</td>
                                        <td>{currentProduct.total_quantity}</td>
                                        <td>{currentProduct.quantity_remaining}</td>
                                        <td>{currentProduct.description}</td>
                                        <td>{(() => get_rating(currentProduct.vendor))()}</td>
                                        <td><Button variant="primary" onClick={() => makeOrder(currentProduct._id)} value={currentProduct._id}>Order</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ViewProducts;