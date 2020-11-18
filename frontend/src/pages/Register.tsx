import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import SEO from '../components/SEO';
import { register } from '../api/services';

interface Props {
  onSuccess: (user: any) => void;
}

const Register: React.FC<Props> = ({ onSuccess }: Props) => {
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword  ] = useState('');
  const [ confirmPassword, setConfirmPassword  ] = useState('');

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      if (password !== confirmPassword) {
        setHasError(true);
        setErrorMessage('Zadané heslá sa nezhodujú!');
        return;
      }
      register(name, email, password)
        .then((response: any) => {
          onSuccess(response.data.user);
        })
        .catch((error) => {
          setHasError(true);
          if (error.code === 2) {
            setErrorMessage('Užívateľ s touto e-mailovou adresou už existuje!');
          } else {
            setErrorMessage('Nepodarilo sa vytvoriť užívateľa!');
          }
          setIsValidated(false);
        });
    }
  };

  return (
    <SEO title="Registrácia" description="">
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
              <Form.Group controlId="loginName">
                <Form.Label>Meno</Form.Label>
                <Form.Control required type="text" placeholder="Zadaj meno" value={name} onChange={onNameChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Postačuje zadať iba meno bez priezviska.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="loginEmail">
                <Form.Label>E-mailová adresa</Form.Label>
                <Form.Control required type="email" placeholder="Zadaj e-mail" value={email} onChange={onEmailChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Tvoja e-mailová adresa nebude s nikým zdieľaná ani využívaná na marketingové účely.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="loginPassword">
                <Form.Label>Heslo</Form.Label>
                <Form.Control required type="password" placeholder="Zadaj heslo" value={password} onChange={onPasswordChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="loginConfirmPassword">
                <Form.Label>Zopakuj heslo</Form.Label>
                <Form.Control required type="password" placeholder="" value={confirmPassword} onChange={onConfirmPasswordChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Registrovať sa
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
};

export default Register;
