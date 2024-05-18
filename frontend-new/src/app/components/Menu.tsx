"use client"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import useAuth from '../../utils/useAuth';

const Menu = () => {
  const currentPath = usePathname();
  const { user, signOut } = useAuth();

  console.log('currentPath', currentPath);

  console.log('user', user);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <NavbarBrand as={Link} href="/">Zdielaj.si</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={currentPath}>
          {
            user !== undefined ? (
              <Nav.Link as={Link} href="/albumy">Albumy</Nav.Link>
            ) : null
          }
          {/*
            <Nav.Link as={Link} to="/obrazky">Obrazky</Nav.Link>
            <Nav.Link as={Link} to="/video">Video</Nav.Link>
            <Nav.Link as={Link} to="/text">Text</Nav.Link>
          */}
          </Nav>
          <Nav activeKey={currentPath}>
            {
              user !== undefined ? (
                <Nav.Link onClick={signOut} href="#">Odhlásiť sa</Nav.Link>
              ) : (
                <Nav.Link as={Link} href="/prihlasit-sa">Prihlásiť sa</Nav.Link>
              )
            }
            <NavLink as={Link} href="/o-aplikacii">O aplikácii</NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
