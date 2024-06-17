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
            <Form.Group controlId="registerName">
              <Form.Label>Meno</Form.Label>
              <Form.Control required type="text" name="name" id="registerName" placeholder="Meno (Priezvisko)" value={values.name} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerEmail" className="mt-3">
              <Form.Label>E-mailová adresa</Form.Label>
              <Form.Control required type="email" name="email" id="registerEmail" placeholder="meno.priezvisko@priklad.sk" value={values.email} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>Heslo</Form.Label>
              <Form.Control required type="password" name="password" id="registerPassword" placeholder="Ozaj1TazkeHeslo!" value={values.password} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              <Form.Text className="text-muted mt-4">
                <ul>
                  <li>Minimálne 8 znakov { values.password.length >= 8 ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>Aspoň jedno veľké písmeno { values.password.toLowerCase() !== values.password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>Aspoň jedno malé písmeno { values.password.toUpperCase() !== values.password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>Aspoň jeden špeciálny znak { values.password.match(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>Aspoň jedno číslo { values.password.match(/\d/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                </ul>
              </Form.Text>
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
