import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

function VendorNavBar() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
            <Navbar.Brand href="/home">BULK PURCHASE APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/addproduct">Add New Product</Nav.Link>
                    <Nav.Link href="/products">View All Products</Nav.Link>
                    <Nav.Link href="/ratings">View All Ratings</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/profile">My Profile</Nav.Link>
                    <Nav.Link href="/logout" >Log Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
}

export default VendorNavBar;