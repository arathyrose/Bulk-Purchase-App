import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

function topBar() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
            <Navbar.Brand href="/home">BULK PURCHASE APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default topBar