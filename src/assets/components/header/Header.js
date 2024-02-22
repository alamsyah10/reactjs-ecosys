import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">EcoSys</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Profile</Nav.Link>
          <Nav.Link href="#link">Messages</Nav.Link>
          <Nav.Link href="#link">Notifications</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
