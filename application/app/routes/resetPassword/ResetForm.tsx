import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { Form, TextField, Label, Input, FieldError, Button, Alert, Spinner } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import logger from '~/logger';
import { trackFormSubmission } from '../../utils/Tracking';

interface Props {
  username: string;
  onResetSubmit: (password: string, code: string) => Promise<void>;
}

const ResetForm: FunctionComponent<Props> = ({ username, onResetSubmit }: Props) => {
  const { t } = useTranslation('', { keyPrefix: 'resetPassword.resetForm' });

  const onSubmit = async (
    _: unknown,
    state: FormData
  ): Promise<{ password: string; code: string; error: string | null }> => {
    const password = state.get('password') as string;
    const code = state.get('code') as string;
    let error = null;

    try {
      await onResetSubmit(password, code);

      trackFormSubmission('reset_password_reset_form', true);
    } catch (err: unknown) {
      trackFormSubmission('reset_password_reset_form', false);

      if (err instanceof Error) {
        logger.error('Unable to request reset password!', { error: { message: err.message, stack: err.stack } });
        error = err.message;
      } else {
        logger.error('Unable to request reset password!', { error: err });
        error = 'Unable to request reset password!';
      }
    }

    return { password, code, error };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, {
    password: '',
    code: '',
    error: null,
  });

  return (
    <>
      {state.error !== null ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Title>{state.error}</Alert.Title>
          </Alert.Content>
        </Alert>
      ) : null}
      <Form action={formAction} className="space-y-6">
        <TextField name="email" type="text" defaultValue={username}>
          <Label>{t('email')}</Label>
          <Input readOnly />
        </TextField>

        <TextField isRequired name="password" type="password" defaultValue={state.password}>
          <Label>{t('password')}</Label>
          <Input placeholder={t('passwordPlaceholder')} autoComplete="current-password" />
          <FieldError>{t('requiredField')}</FieldError>
        </TextField>

        <TextField isRequired name="code" type="text" defaultValue={state.code}>
          <Label>{t('code')}</Label>
          <Input placeholder={t('codePlaceholder')} autoComplete="one-time-code" />
          <FieldError>{t('requiredField')}</FieldError>
        </TextField>

        <Button type="submit" variant="primary" fullWidth={true} isPending={isPending}>
          {({ isPending }) => (
            <>
              {isPending && <Spinner color="current" size="sm" />}
              {t('resetPasswordButton')}
            </>
          )}
        </Button>
      </Form>
    </>
  );
};

export default ResetForm;
