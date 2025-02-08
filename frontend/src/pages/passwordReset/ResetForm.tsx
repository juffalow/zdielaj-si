import { useState } from 'react';
import type { FunctionComponent, ChangeEvent, FormEvent } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

interface Props {
  username: string;
  onResetSubmit: (password: string, code: string) => Promise<void>;
}

const ResetForm: FunctionComponent<Props> = ({ username, onResetSubmit }: Props) => {
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [values, setValues] = useState({
    password: '',
    code: '',
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValues({
      ...values,
      [event.target.name]: value
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      onResetSubmit(values.password, values.code)
        .catch(() => {
          setErrorMessage('Chyba!');
          setHasError(true);
          setIsValidated(false);
        });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center mb-5">Resetovať heslo</h1>
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
            <Form.Group controlId="resetUsername">
              <Form.Label>E-mailová adresa</Form.Label>
              <Form.Control required type="email" name="email" id="resetUsername" placeholder="meno.priezvisko@priklad.sk" value={username} disabled readOnly />
            </Form.Group>

            <Form.Group controlId="resetPassword" className="mt-3">
              <Form.Label>Heslo</Form.Label>
              <Form.Control required type="password" name="password" id="resetPassword" placeholder="Ozaj1TazkeHeslo!" value={values.password} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="resetCode" className="mt-3">
              <Form.Label>Overovací kód</Form.Label>
              <Form.Control required type="text" name="code" id="resetCode" placeholder="123456" value={values.code} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="text-center mt-4">
              <Button variant="primary" type="submit">
                Nastaviť heslo
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ResetForm;
