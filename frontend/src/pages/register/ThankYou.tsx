import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ThankYou: React.FC = () => (
  <Row>
    <Col>
      <h1 className="text-center">Ďakujem za registráciu!</h1>
      <p className="text-center">Tvoja e-mailová adresa bola overená. Možeš pokračovať prihlásením sa do svojho účtu <Link to="/prihlasit-sa">tu</Link>.</p>
    </Col>
  </Row>
);

export default ThankYou;
