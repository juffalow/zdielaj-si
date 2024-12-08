import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import useAuth from '../utils/useAuth';

const Menu = () => {
  const { user, hasInitialized, signOut } = useAuth();
  const { i18n, t } = useTranslation();

  const onChangeLang = (e: React.MouseEvent<HTMLElement>) => {
    const code = (e.target as HTMLElement).getAttribute('data-lang') || 'sk';
    i18n.changeLanguage(code);
  };

  const lang = i18n.language === 'sk' ? (<>&#x1F1F8;&#x1F1F0; SK</>)
    : i18n.language === 'en' ? (<>&#x1F1EC;&#x1F1E7; EN</>)
    : i18n.language === 'cz' ? (<>&#x1F1E8;&#x1F1FF; CZ</>)
    : i18n.language === 'de' ? (<>&#x1F1E9;&#x1F1EA; DE</>)
    : i18n.language === 'es' ? (<>&#x1F1EA;&#x1F1F8; ES</>)
    : i18n.language === 'fr' ? (<>&#x1F1EB;&#x1F1F7; FR</>)
    : (<>&#x1F1F8;&#x1F1F0; SK</>);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect={true}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Zdielaj.si</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {
            user !== undefined ? (
              <Nav.Link as={Link} to="/albumy">{t("menu.albums")}</Nav.Link>
            ) : null
          }
          </Nav>
          <Nav>
            {
              hasInitialized === false ? (
                <></>
              ) : user !== undefined ? (
                <NavDropdown title={user?.meta?.name || 'Užívateľ'} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profil">{t("menu.profile")}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/predplatne">{t("menu.subscription")}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signOut}>{t("menu.signOut")}</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/prihlasit-sa">{t("menu.signIn")}</Nav.Link>
              )
            }
            <Nav.Link as={Link} to="/o-aplikacii">{t("menu.about")}</Nav.Link>
            <NavDropdown title={lang} id="basic-nav-dropdown" active>
              <NavDropdown.Item onClick={onChangeLang} data-lang="sk">&#x1F1F8;&#x1F1F0; SK</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="cz">&#x1F1E8;&#x1F1FF; CZ</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="en">&#x1F1EC;&#x1F1E7; EN</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="de">&#x1F1E9;&#x1F1EA; DE</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="es">&#x1F1EA;&#x1F1F8; ES</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="fr" disabled>&#x1F1EB;&#x1F1F7; FR</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default React.memo(Menu);
