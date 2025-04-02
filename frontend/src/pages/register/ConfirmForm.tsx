import { useState, useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {
  onConfirmSubmit: (code: string) => Promise<void>;
}

const ConfirmForm: FunctionComponent<Props> = ({ onConfirmSubmit }: Props) => {
  const { t } = useTranslation();
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);

  const onSubmit = async (prevState: unknown, state: FormData): Promise<{ code: string }> => {
    const code = state.get('code') as string;
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

    return { code };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, { code: '' });

  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center">{t("register.confirmForm.title")}</h1>
          <p className="text-center mb-5">{t("register.confirmForm.subtitle")}</p>
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
            <Form.Group controlId="confirmCode">
              <Form.Label>{t("register.confirmForm.code")}</Form.Label>
              <Form.Control required type="text" name="code" placeholder="123456" defaultValue={state.code} />
              <Form.Control.Feedback type="invalid">{t("register.confirmForm.requiredField")}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="text-center mt-4 mb-2">
              <Button variant="primary" type="submit" disabled={isPending}>
              {t("register.confirmForm.submitButton")}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ConfirmForm;
