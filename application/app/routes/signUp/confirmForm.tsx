import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputOTP, Button, Alert, FieldError } from '@heroui/react';
import logger from '../../logger';
import { trackFormSubmission } from '../../utils/Tracking';

interface Props {
  onConfirmSubmit: (code: string) => Promise<void>;
}

const ConfirmForm: FunctionComponent<Props> = ({ onConfirmSubmit }: Props) => {
  const { t } = useTranslation('', { keyPrefix: 'signUp.confirmForm' });

  const onSubmit = async (_: unknown, state: FormData): Promise<{ code: string; error: string | null }> => {
    const code = state.get('code') as string;
    let error = null;

    try {
      await onConfirmSubmit(code);

      trackFormSubmission('sign_up_confirm_form', true);
    } catch (err) {
      logger.error('Unable to confirm sign up!', { error: err });

      trackFormSubmission('sign_up_confirm_form', false);

      if (typeof err === 'object' && err !== null && 'name' in err && err.name === 'CodeMismatchException') {
        error = t('errors.codeMismatch');
      } else {
        error = t('errors.default');
      }
    }

    return { code, error };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, { code: '', error: null });

  return (
    <Form action={formAction} className="space-y-6">
      {
        state.error !== null ? (
          <Alert status="danger">
            <Alert.Content>
              <Alert.Description>
                {state.error}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        ) : null
      }

      <p className="text-center">{t('confirmCodeDescription')}</p>

      <InputOTP
        required
        isInvalid
        name="code"
        maxLength={6}
        className="mx-auto"
      >
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>

      <FieldError>{t('requiredField')}</FieldError>

      <Button type="submit" variant="primary" fullWidth={true} isDisabled={isPending}>
        {t('confirmSignUpButton')}
      </Button>
    </Form>
  );
};

export default ConfirmForm;
