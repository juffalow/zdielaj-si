import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

interface MenuProps {
  isLogged: boolean;
  onLogout: () => void;
}

const Menu = ({ isLogged, onLogout }: MenuProps) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
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
          {
            isLogged ? (
              <Nav.Link onClick={onLogout} href="#">Odhlásiť sa</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/prihlasit-sa">Prihlásiť sa</Nav.Link>
            )
          }

          <Nav.Link as={Link} to="/o-aplikacii">O aplikácii</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default React.memo(Menu);
