import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'

function customerNavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
      <Navbar.Brand href="/home">BULK PURCHASE APP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/orders">Orders</Nav.Link>
          <Nav.Link href="/vendors">Vendors</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/profile">My Profile</Nav.Link>
          <Nav.Link href="/logout" >Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default customerNavBar;