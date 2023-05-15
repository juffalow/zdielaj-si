import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { verifyEmail } from '../api/services';
import { getQueryParameter } from '../utils/functions';

const Validation: React.FC = () => {
  const [ isValid, setIsValid ] = useState<boolean | undefined>();

  useEffect(() => {
    async function validate() {
      try {
        const id = parseInt(getQueryParameter('id'));
        const token = getQueryParameter('token');
        await verifyEmail(id, token);
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
      }
    }

    validate();
  });
  return (
    <SEO title="Validácia" description="">
      <Container>
        <Row>
          <Col>
            {
              isValid === false ? (
                <>
                  <h1>Overenie sa nepodarilo</h1>
                  <p className="lead">Nebolo možné overiť tvoju e-mailovú adresu.</p>
                </>
              ) : null
            }
            {
              isValid === true ? (
                <>
                  <h1>Overenie bolo úspešné</h1>
                  <p className="lead">Tvoja e-mailová adresa bola overená. Možeš pokračovať prihlásením sa do svojho účtu <Link to="/prihlasit-sa">tu</Link>.</p>
                </>
              ) : null
            }
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Validation;
