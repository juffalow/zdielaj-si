import type { MouseEvent } from 'react';
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

  const onChangeLang = (e: MouseEvent<HTMLElement>) => {
    const code = (e.target as HTMLElement).getAttribute('data-lang') || 'sk';
    i18n.changeLanguage(code);
  };

  const lang = i18n.language === 'sk' ? (<>&#x1F1F8;&#x1F1F0; SK</>)
    : i18n.language === 'en' ? (<>&#x1F1EC;&#x1F1E7; EN</>)
    : i18n.language === 'cz' ? (<>&#x1F1E8;&#x1F1FF; CZ</>)
    : i18n.language === 'de' ? (<>&#x1F1E9;&#x1F1EA; DE</>)
    : i18n.language === 'es' ? (<>&#x1F1EA;&#x1F1F8; ES</>)
    : i18n.language === 'fr' ? (<>&#x1F1EB;&#x1F1F7; FR</>)
    : i18n.language === 'fi' ? (<>&#127467;&#127470; FI</>)
    : i18n.language === 'se' ? (<>&#127480;&#127466; SE</>)
    : i18n.language === 'no' ? (<>&#127475;&#127476; NO</>)
    : i18n.language === 'it' ? (<>&#127470;&#127481; IT</>)
    : i18n.language === 'pl' ? (<>&#127477;&#127473; PL</>)
    : i18n.language === 'hu' ? (<>&#127469;&#127482; HU</>)
    : i18n.language === 'si' ? (<>&#127480;&#127470; SI</>)
    : (<>&#x1F1F8;&#x1F1F0; SK</>);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect={true}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Zdielaj.si</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {
            user !== null ? (
              <Nav.Link as={Link} to="/albumy" data-tracking-id="menu_button_albums_click">{t("menu.albums")}</Nav.Link>
            ) : null
          }
          </Nav>
          <Nav>
            {
              hasInitialized === false ? (
                <></>
              ) : user !== null ? (
                <NavDropdown title={user?.meta?.name || 'Užívateľ'} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profil" data-tracking-id="menu_button_profile_click">{t("menu.profile")}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/predplatne" data-tracking-id="menu_button_subscription_click">{t("menu.subscription")}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signOut} data-tracking-id="menu_button_signout_click">{t("menu.signOut")}</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to={`${t('routes.prefix')}${t('routes.signIn')}`} data-tracking-id="menu_button_signin_click">{t("menu.signIn")}</Nav.Link>
              )
            }
            <Nav.Link as={Link} to={`${t('routes.prefix')}${t('routes.about')}`}>{t("menu.about")}</Nav.Link>
            <NavDropdown title={lang} id="basic-nav-dropdown" data-tracking-id="menu_button_language_click" active>
              <NavDropdown.Item onClick={onChangeLang} data-lang="sk">&#x1F1F8;&#x1F1F0; SK</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="cz">&#x1F1E8;&#x1F1FF; CZ</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="en">&#x1F1EC;&#x1F1E7; EN</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="de">&#x1F1E9;&#x1F1EA; DE</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="es">&#x1F1EA;&#x1F1F8; ES</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="fr">&#x1F1EB;&#x1F1F7; FR</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="it">&#127470;&#127481; IT</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="no">&#127475;&#127476; NO</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="se">&#127480;&#127466; SE</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="fi">&#127467;&#127470; FI</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="pl">&#127477;&#127473; PL</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="hu">&#127469;&#127482; HU</NavDropdown.Item>
              <NavDropdown.Item onClick={onChangeLang} data-lang="si">&#127480;&#127470; SI</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
