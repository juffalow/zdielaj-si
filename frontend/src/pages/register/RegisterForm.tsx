import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
            setErrorMessage(t("register.error.userAlreadyExists"));
          } else {
            setErrorMessage(t("register.error.userNotCreated"));
          }
          setIsValidated(false);
        });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center">{t("register.title")}</h1>
          <p className="text-center mb-5">{t("register.subtitle")} <Link to="/prihlasit-sa">{t("register.subtitleLink")}</Link></p>
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
              <Form.Label>{t("register.form.name")}</Form.Label>
              <Form.Control required type="text" name="name" id="registerName" placeholder="Meno (Priezvisko)" value={values.name} onChange={onChange} />
              <Form.Control.Feedback type="invalid">{t("register.form.requiredField")}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerEmail" className="mt-3">
              <Form.Label>{t("register.form.email")}</Form.Label>
              <Form.Control required type="email" name="email" id="registerEmail" placeholder="meno.priezvisko@priklad.sk" value={values.email} onChange={onChange} />
              <Form.Control.Feedback type="invalid">{t("register.form.requiredField")}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>{t("register.form.password")}</Form.Label>
              <Form.Control required type="password" name="password" id="registerPassword" placeholder="Ozaj1TazkeHeslo!" value={values.password} onChange={onChange} />
              <Form.Control.Feedback type="invalid">{t("register.form.requiredField")}</Form.Control.Feedback>
              <Form.Text className="text-muted mt-4">
                <ul>
                  <li>{t("register.form.minEightCharacters")} { values.password.length >= 8 ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>{t("register.form.atLeastOneUppercase")} { values.password.toLowerCase() !== values.password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>{t("register.form.atLeastOneLowercase")} { values.password.toUpperCase() !== values.password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>{t("register.form.atLeastOneSpecialCharacter")} { values.password.match(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>{t("register.form.atLeastOneNumber")} { values.password.match(/\d/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                </ul>
              </Form.Text>
            </Form.Group>

            <Form.Group className="text-center mt-4 mb-2">
              <Button variant="primary" type="submit">
                {t("register.form.signUpButton")}
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
