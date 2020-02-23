import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function ViewProducts() {
    const [ID, setID] = useState("");
    const [productID, setProductID] = useState("")
    const [product, setProduct] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [searchString, setSearchString] = useState("")
    useEffect(() => {
        let a = localStorage.getItem('DASS_USERID')
        if (!a || a == 0)
            setID("")
        else
            setID(a)

        axios.get('http://localhost:4000/product/vendor/' + a)// + { searchString }.searchString)
            .then(response => {
                console.log(response.data)
                setProduct(response.data);
                setAllProducts(response.data)
            })
    }, []);

    function updateList(e) {
        e.preventDefault();
        console.log(searchString)
        var results = allProducts.filter(function (i) {
            return i.name.indexOf(searchString) !== -1;
        })
        console.log(results)
        if (searchString == "") {
            results = allProducts
        }
        setProduct(results)
    }

    function viewMore(pid) {
        setProductID(pid)
        localStorage.setItem('DASS_ITEMID', pid)
        window.location.replace('/action')
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
                        <input type="submit" value="SEARCH" className="btn btn-primary" />
                    </div>
                </form>
            </div>

            <div>
                <table className="table table-hover thead-light table-responsive-lg ">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Total Quantity for Dispatch</th>
                            <th>Quantity remaining for Dispatch</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            { product }.product.map((currentProduct, i) => {
                                return (
                                    <tr>
                                        <td>{currentProduct.name}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>{currentProduct.total_quantity}</td>
                                        <td>{currentProduct.quantity_remaining}</td>
                                        <td>{currentProduct.status}</td>
                                        <td><Button variant="dark" onClick={() => viewMore(currentProduct._id)} value={currentProduct._id}>Actions</Button></td>
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