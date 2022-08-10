import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import SEO from '../components/SEO';

const Notifications: React.FC = () => (
  <SEO title="Notifikácie" description="">
    <Container>
      <Row>
        <Col>
          <h1>Notifikácie</h1>
          <p className="lead"></p>

          <Form>
            <h3 className="mt-4">Informácie o účte</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Check 
                disabled
                type="switch"
                id="custom-switch"
                label="Notifikácie (povinné)"
                checked={true}
              />
              <Form.Text className="text-muted">
                Upozornenia týkajúce sa účtu obsahujú dôležité informácie, ako sú aktualizácie a zmeny týkajúce sa vášho účtu.
              </Form.Text>
            </Form.Group>
            <h3 className="mt-4">Produktové informácie</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Check 
                disabled
                type="switch"
                id="custom-switch"
                label="Oznámenie o aktualizácii"
                checked={false}
              />
              <Form.Text className="text-muted">
                Nové funkcie, zmena limitov, podpora nového formátu.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Check 
                disabled
                type="switch"
                id="custom-switch"
                label="Oznamenie o aktualizacii"
                checked={false}
              />
              <Form.Text className="text-muted">
                Nove funkcie, zmena limitov, podpora noveho formatu.
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  </SEO>
);

export default Notifications;
