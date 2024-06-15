import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {
  onConfirmSubmit: (code: string) => Promise<void>;
}

const ConfirmForm: React.FC<Props> = ({ onConfirmSubmit }: Props) => {
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [values, setValues] = React.useState({ code: '' });

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
      const { code } = values;
      onConfirmSubmit(code)
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
          <h1 className="text-center">Overenie e-mailovej adresy</h1>
          <p className="text-center mb-5">Na tvoj e-mail bol odoslaný overovací kód.</p>
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
            <Form.Group controlId="confirmCode">
              <Form.Label>Overovací kód</Form.Label>
              <Form.Control required type="text" name="code" id="confirmCode" placeholder="123456" value={values.code} onChange={onChange} />
              <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="text-center mt-4 mb-2">
              <Button variant="primary" type="submit">
                Dokončiť registráciu
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ConfirmForm;
