import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

interface Props {
  onRequestSubmit: (username: string) => Promise<void>;
}

const RequestResetForm: React.FC<Props> = ({ onRequestSubmit }: Props) => {
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [values, setValues] = React.useState({
    email: '',
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
      onRequestSubmit(values.email)
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
          <h1 className="text-center">Resetovať heslo</h1>
          <p className="text-center mb-5">Zadaj e-mailovú adresu, ktorú používaš na prihlásenie.</p>
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
            <Form.Group controlId="requestResetUsername">
              <Form.Label>E-mailová adresa</Form.Label>
              <Form.Control required type="email" name="email" id="requestResetUsername" placeholder="meno.priezvisko@priklad.sk" value={values.email} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="text-center mt-4">
              <Button variant="primary" type="submit">
                Získať overovací kód
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default RequestResetForm;
