import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import SEO from '../components/SEO';
import { getQueryParameter } from '../utils/functions';

const Notifications: React.FC = () => {
  const [ hasLogin, setLogin ] = useState(false);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CORE_URL}/notifications?email=${getQueryParameter('email')}`, {
      headers: {
        'Authorization': getQueryParameter('token'),
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
        const loginNotification = json.data.notifications.find((n: any) => n.notification === 'login');
        setLogin(typeof loginNotification !== 'undefined' && loginNotification.isEnabled);
      })
      .catch(() => setHasError(true));
  }, []);

  return (
    <SEO title="Notifikácie" description="">
      <Container>
        <Row>
          <Col>
            <h1>Notifikácie</h1>
            <p className="lead"></p>
            {
              hasError ? (
                <Alert variant="danger">Neplatná url adresa alebo vypršala platnosť!</Alert>
              ) : (
                <Form>
                  <h3 className="mt-4">Informácie o účte</h3>
                  <Form.Group className="mb-3" controlId="notificationGeneral">
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
                  <Form.Group className="mb-3" controlId="notificationLogin">
                    <Form.Check 
                      type="switch"
                      id="custom-switch"
                      label="Prihlásenie do účtu"
                      checked={hasLogin}
                    />
                    <Form.Text className="text-muted">
                      Úspešné prihlásenie do účtu z nového zariadenia.
                    </Form.Text>
                  </Form.Group>
                  <h3 className="mt-4">Produktové informácie</h3>
                  <Form.Group className="mb-3" controlId="notificationNewFeature">
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
                </Form>
              )
            }
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Notifications;
