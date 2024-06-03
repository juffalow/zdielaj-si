import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {
  onRegisterSubmit: (username: string, password: string, meta: Record<string, string | number | boolean>) => Promise<void>;
}

const RegisterForm: React.FC<Props> = ({ onRegisterSubmit }: Props) => {
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [values, setValues] = React.useState({
    name: '',
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
      const { email, password, ...rest } = values;
      onRegisterSubmit(email, password, rest)
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
    <>
      <Row>
        <Col>
          <h1 className="text-center">Vytvor si účet</h1>
          <p className="text-center mb-5">Máš už účet? <Link to="/prihlasit-sa">Prihlásiť sa</Link></p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          {
            hasError ? (
              <Alert variant={'danger'}>
                {errorMessage}
              </Alert>
            ) : null
          }
          <Form noValidate validated={isValidated} onSubmit={onSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Meno</Form.Label>
              <Form.Control required type="text" name="name" placeholder="Meno (Priezvisko)" value={values.name} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>E-mailová adresa</Form.Label>
              <Form.Control required type="email" name="email" placeholder="meno.priezvisko@priklad.sk" value={values.email} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Heslo</Form.Label>
              <Form.Control required type="password" name="password" placeholder="Ozaj1TazkeHeslo!" value={values.password} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="text-center mt-4 mb-2">
              <Button variant="primary" type="submit">
                Registrovať sa
              </Button>
            </Form.Group>
            <Form.Text className="text-muted mt-4">
              Tvoja e-mailová adresa nebude s nikým zdieľaná ani využívaná na marketingové účely.
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default RegisterForm;
