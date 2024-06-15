import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import useAuth from '../utils/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValues({
      ...values,
      [event.target.name]: value
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      signIn(values.email, values.password)
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          setErrorMessage('Nesprávne prihlasovacie meno alebo heslo!');
          setHasError(true);
          setIsValidated(false);
        });
    }
  };

  return (
    <SEO title="Prihlásiť sa" description="">
      <Container className="main" style={{ marginTop: 50 }}>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            {
              hasError ? (
                <Alert variant={'danger'}>
                  {errorMessage}
                </Alert>
              ) : null
            }
            <h1 className="text-center">Prihlásiť sa</h1>
            <p className="text-center mb-5">Ešte nemáš už účet? <Link to="/registracia">Registrovať sa</Link></p>

            <Form noValidate validated={isValidated} onSubmit={onSubmit}>
              <Form.Group controlId="loginUsername">
                <Form.Label>E-mailová adresa</Form.Label>
                <Form.Control required type="email" name="email" id="loginUsername" placeholder="meno.priezvisko@priklad.sk" value={values.email} onChange={onChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>Heslo</Form.Label>
                <Form.Control required type="password" name="password" id="loginPassword" placeholder="Ozaj1TazkeHeslo!" value={values.password} onChange={onChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>

              <p className="text-center mt-3"><Link to="/reset-hesla">Zabudnuté heslo?</Link></p>

              <Form.Group className="text-center mt-4">
                <Button variant="primary" type="submit">
                  Prihlásiť sa
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
};

export default Login;
