import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Menu = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand as={Link} to="/">Zdielaj.si</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      {/*
        <Nav.Link as={Link} to="/obrazky">Obrazky</Nav.Link>
        <Nav.Link as={Link} to="/video">Video</Nav.Link>
        <Nav.Link as={Link} to="/text">Text</Nav.Link>
      */}
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/o-aplikacii">O aplikacii</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default React.memo(Menu);
