import { useState, useActionState } from 'react';
import type { FunctionComponent } from 'react';
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

const RegisterForm: FunctionComponent<Props> = ({ onRegisterSubmit }: Props) => {
  const { t } = useTranslation();
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [ password, setPassword ] = useState('');

  const onSubmit = async (prevState: unknown, state: FormData): Promise<{ name: string, email: string, password: string }> => {
    const name = state.get('name') as string;
    const email = state.get('email') as string;
    const password = state.get('password') as string;

    onRegisterSubmit(email, password, { name })
      .catch((error) => {
        setHasError(true);
        if (error.code === 2) {
          setErrorMessage(t("register.error.userAlreadyExists"));
        } else {
          setErrorMessage(t("register.error.userNotCreated"));
        }
        setIsValidated(false);
      });

    return { name, email, password };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, { name: '', email: '', password: '' });

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
          <Form noValidate validated={isValidated} action={formAction}>
            <Form.Group controlId="registerName">
              <Form.Label>{t("register.form.name")}</Form.Label>
              <Form.Control required type="text" name="name" placeholder="Meno (Priezvisko)" defaultValue={state.name} />
              <Form.Control.Feedback type="invalid">{t("register.form.requiredField")}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerEmail" className="mt-3">
              <Form.Label>{t("register.form.email")}</Form.Label>
              <Form.Control required type="email" name="email" placeholder="meno.priezvisko@priklad.sk" defaultValue={state.email} />
              <Form.Control.Feedback type="invalid">{t("register.form.requiredField")}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>{t("register.form.password")}</Form.Label>
              <Form.Control required type="password" name="password" placeholder="Ozaj1TazkeHeslo!" defaultValue={state.password} onChange={(event) => setPassword(event.target.value)} />
              <Form.Control.Feedback type="invalid">{t("register.form.requiredField")}</Form.Control.Feedback>
              <Form.Text className="text-muted mt-4">
                <ul>
                  <li>{t("register.form.minEightCharacters")} { password.length >= 8 ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>{t("register.form.atLeastOneUppercase")} { password.toLowerCase() !== password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>{t("register.form.atLeastOneLowercase")} { password.toUpperCase() !== password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>{t("register.form.atLeastOneSpecialCharacter")} { password.match(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                  <li>{t("register.form.atLeastOneNumber")} { password.match(/\d/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
                </ul>
              </Form.Text>
            </Form.Group>

            <Form.Group className="text-center mt-4 mb-2">
              <Button variant="primary" type="submit" disabled={isPending}>
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
