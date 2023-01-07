import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark" style={{ color: '#fff' }}>
    <Container fluid={true}>
      <Row>
        <Col>
          Created with <span style={{ color: 'red' }}>&hearts;</span> by <a href="https://juffalow.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Matej <span style={{ color: 'red' }}>'juffalow'</span> Jellus</a> | 2021 - 2023
        </Col>
      </Row>
    </Container>
  </footer>
);

export default React.memo(Footer);
