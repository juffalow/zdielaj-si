import { withTranslation, WithTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import InstagramIcon from './Footer/instagram.svg';

const Footer = ({ t }: WithTranslation) => (
  <Container fluid={true} className="bg-dark">
    <footer className="footer mt-auto py-3 bg-dark text-white" style={{ color: '#000' }}>
      <Row>
        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 3 }} className="mb-3">
          <h5 className="mb-4"><img src="/zdielaj-si-logo.png" width="32" className="rounded" /> Zdielaj.si</h5>
          {/* <a href="" rel="noopener noreferrer" target="_blank"><img src={FacebookIcon} alt="Facebook" width="24" className="text-white" /></a> */}
          <p style={{ fontSize: '0.9rem' }}>{t("footer.description")}</p>
          <a href="https://www.instagram.com/zdielaj.si/" rel="noopener noreferrer" target="_blank" className="ms-1"><img src={InstagramIcon} alt="Instagram" width="24" className="text-white" /></a>
        </Col>
        <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 3, offset: 3 }} lg={{ span: 2, offset: 5 }}>
          <h6>{t("footer.links")}</h6>
          <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}></hr>
          <p><Link className="nav-link text-light" to={`${t('routes.prefix')}${t('routes.home')}`} data-tracking-id="footer_link_home_click">{t("footer.home")}</Link></p>
          <p><Link className="nav-link text-light" to={`${t('routes.prefix')}${t('routes.signUp')}`} data-tracking-id="footer_link_register_click">{t("footer.register")}</Link></p>
          <p><Link className="nav-link text-light" to="https://status.zdielaj.si/" data-tracking-id="footer_link_status_click">{t("footer.status")}</Link></p>
          <p><Link className="nav-link text-light" to={`${t('routes.prefix')}${t('routes.about')}`} data-tracking-id="footer_link_about_click">{t("footer.about")}</Link></p>
        </Col>
        <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 3 }} lg={{ span: 2 }}>
          <h6>{t("footer.contact")}</h6>
          <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}></hr>
          <p><a className="nav-link text-light" href="mailto:info@zdielaj.si" data-tracking-id="footer_link_email_click">info@zdielaj.si</a></p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <hr />
          <p className="text-center text-light mb-0" style={{color: '#000', fontSize: '0.7rem'}}><a href="https://juffalow.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Matej <span style={{ color: 'red' }}>'juffalow'</span> Jelluš</a> | 2021 - 2025</p>
        </Col>
      </Row>      
    </footer>
  </Container>
);

export default withTranslation()(Footer);
