import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import useAuth from '../utils/useAuth';

const Menu = () => {
  const { user, hasInitialized, signOut } = useAuth();

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
              hasInitialized === false ? (
                <></>
              ) : user !== undefined ? (
                <NavDropdown title={user?.meta?.name || 'Užívateľ'} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profil">Profil</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/predplatne">Predplatné</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signOut}>Odhlásiť sa</NavDropdown.Item>
                </NavDropdown>
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
