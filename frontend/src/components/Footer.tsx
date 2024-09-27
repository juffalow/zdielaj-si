import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import InstagramIcon from './Footer/instagram.svg';

const Footer = () => (
  <Container fluid={true} className="bg-dark">
    <footer className="footer mt-auto py-3 bg-dark text-white" style={{ color: '#000' }}>
      <Row>
        <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 3 }} className="mb-3">
          <h5 className="mb-4"><img src="/zdielaj-si-logo.png" width="32" className="rounded" /> Zdielaj.si</h5>
          {/* <a href="" rel="noopener noreferrer" target="_blank"><img src={FacebookIcon} alt="Facebook" width="24" className="text-white" /></a> */}
          <p style={{ fontSize: '0.9rem' }}>Aplikácia pomáha užívateľom rýchlo a ľahko zdielať fotografie a videá bez zníženia kvality. </p>
          <a href="https://www.instagram.com/zdielaj.si/" rel="noopener noreferrer" target="_blank" className="ms-1"><img src={InstagramIcon} alt="Instagram" width="24" className="text-white" /></a>
        </Col>
        <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 3, offset: 3 }} lg={{ span: 2, offset: 5 }}>
          <h6>Odkazy</h6>
          <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}></hr>
          <p><Link className="nav-link text-light" to="/">Domov</Link></p>
          <p><Link className="nav-link text-light" to="/registracia">Registrácia</Link></p>
          <p><Link className="nav-link text-light" to="https://status.zdielaj.si/">Status</Link></p>
          <p><Link className="nav-link text-light" to="/o-aplikacii">O aplikácii</Link></p>
        </Col>
        <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 3 }} lg={{ span: 2 }}>
          <h6>Kontakt</h6>
          <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}></hr>
          <p><a className="nav-link text-light" href="mailto:info@zdielaj.si">info@zdielaj.si</a></p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <hr />
          <p className="text-center text-light mb-0" style={{color: '#000', fontSize: '0.7rem'}}><a href="https://juffalow.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Matej <span style={{ color: 'red' }}>'juffalow'</span> Jelluš</a> | 2021 - 2024</p>
        </Col>
      </Row>      
    </footer>
  </Container>
);

export default React.memo(Footer);
