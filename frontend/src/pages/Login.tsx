import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    <SEO title={t("login.title")} description="">
      <Container className="main" style={{ marginTop: 50 }}>
        <Row>
          <Col>
            <h1 className="text-center">{t("login.title")}</h1>
            <p className="text-center mb-5">{t("login.subtitle")} <Link to="/registracia">{t("login.subtitleLink")}</Link></p>
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
              <Form.Group controlId="loginUsername">
                <Form.Label>{t("login.form.email")}</Form.Label>
                <Form.Control required type="email" name="email" placeholder="meno.priezvisko@priklad.sk" value={values.email} onChange={onChange} />
                <Form.Control.Feedback type="invalid">{t("login.form.requiredField")}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>{t("login.form.password")}</Form.Label>
                <Form.Control required type="password" name="password" placeholder="Ozaj1TazkeHeslo!" value={values.password} onChange={onChange} />
                <Form.Control.Feedback type="invalid">{t("login.form.requiredField")}</Form.Control.Feedback>
              </Form.Group>

              <p className="text-center mt-3"><Link to="/reset-hesla">{t("login.form.forgotPassword")}</Link></p>

              <Form.Group className="text-center mt-4">
                <Button variant="primary" type="submit">
                  {t("login.form.signInButton")}
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
