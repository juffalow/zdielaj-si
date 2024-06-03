import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import useAuth from '../utils/useAuth';

const Menu = () => {
  const { user, signOut } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Zdielaj.si</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {
            user !== undefined ? (
              <Nav.Link as={Link} to="/albumy">Albumy</Nav.Link>
            ) : null
          }
          </Nav>
          <Nav>
            {
              user !== undefined ? (
                <Nav.Link onClick={signOut} href="#">Odhlásiť sa</Nav.Link>
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
}

export default React.memo(Menu);
