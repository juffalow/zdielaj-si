import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { login } from '../api/services';

interface Props {
  onSuccess: (user: any) => void;
}

const Login: React.FC<Props> = ({ onSuccess }: Props) => {
  const navigate = useNavigate();
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword  ] = useState('');

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      login(email, password)
        .then((response: any) => {
          onSuccess(response.data.user);
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
          <Col md={{ span: 4, offset: 4 }}>
            {
              hasError ? (
                <Alert variant={'danger'}>
                  {errorMessage}
                </Alert>
              ) : null
            }
            <Form noValidate validated={isValidated} onSubmit={onSubmit}>
              <Form.Group controlId="loginEmail">
                <Form.Label>E-mailová adresa</Form.Label>
                <Form.Control required type="email" placeholder="Zadaj e-mail" value={email} onChange={onEmailChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>Heslo</Form.Label>
                <Form.Control required type="password" placeholder="Zadaj heslo" value={password} onChange={onPasswordChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>

              <p className="mt-3">Ešte tu nemáš účet? Môžeš si ho vytvoriť <Link to="/registracia">tu</Link>.</p>

              <Button variant="primary" type="submit">
                Prihlásiť sa
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
};

export default Login;
