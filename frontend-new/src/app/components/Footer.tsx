import React from 'react';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';

const Footer = () => (
  <Container fluid={true} className="bg-dark">
    <footer className="footer mt-auto py-3 bg-dark" style={{ color: '#000' }}>
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link className="nav-link px-2 text-light" href="/">Domov</Link></li>
        <li className="nav-item"><Link className="nav-link px-2 text-light" href="/registracia">Registrácia</Link></li>
        <li className="nav-item"><Link className="nav-link px-2 text-light" href="/o-aplikacii">O aplikácii</Link></li>
      </ul>
      <p className="text-center text-light" style={{color: '#000'}}><a href="https://juffalow.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Matej <span style={{ color: 'red' }}>&apos;juffalow&apos;</span> Jelluš</a> | 2021 - 2024</p>
    </footer>
  </Container>
);

export default React.memo(Footer);
