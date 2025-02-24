import { useState, useActionState } from 'react';
import type { FunctionComponent } from 'react';
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

const Login: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);

  const onSubmit = async (prevState: unknown, state: FormData): Promise<{ email: string, password: string }> => {
    const email = state.get('email') as string;
    const password = state.get('password') as string;

    await signIn(email, password)
      .then(() => {
        setTimeout(() => navigate('/'), 100);
      })
      .catch(() => {
        setErrorMessage('Nesprávne prihlasovacie meno alebo heslo!');
        setHasError(true);
        setIsValidated(false);
      });

    return { email, password };
  }

  const [state, formAction, isPending] = useActionState(onSubmit, { email: '', password: '' });

  return (
    <SEO title={t("login.title")} description="">
      <Container className="main">
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
            <Form noValidate validated={isValidated} action={formAction}>
              <Form.Group controlId="loginUsername">
                <Form.Label>{t("login.form.email")}</Form.Label>
                <Form.Control required type="email" name="email" placeholder="meno.priezvisko@priklad.sk" defaultValue={state.email} />
                <Form.Control.Feedback type="invalid">{t("login.form.requiredField")}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>{t("login.form.password")}</Form.Label>
                <Form.Control required type="password" name="password" placeholder="Ozaj1TazkeHeslo!" defaultValue={state.password} />
                <Form.Control.Feedback type="invalid">{t("login.form.requiredField")}</Form.Control.Feedback>
              </Form.Group>

              <p className="text-center mt-3"><Link to="/reset-hesla">{t("login.form.forgotPassword")}</Link></p>

              <Form.Group className="text-center mt-4">
                <Button variant="primary" type="submit" disabled={isPending}>
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
