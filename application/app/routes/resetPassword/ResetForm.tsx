import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { Form, Input, Button, Alert } from '@heroui/react';
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
      {state.error !== null ? <Alert color="danger" title={state.error} hideIcon={true} /> : null}
      <Form action={formAction} className="space-y-6">
        <Input
          label={t('email')}
          labelPlacement="outside"
          name="email"
          defaultValue={username}
          type="text"
          readOnly={true}
        />

        <Input
          isRequired
          errorMessage={t('requiredField')}
          label={t('password')}
          labelPlacement="outside"
          name="password"
          placeholder={t('passwordPlaceholder')}
          defaultValue={state.password}
          type="password"
          autoComplete="current-password"
        />

        <Input
          isRequired
          errorMessage={t('requiredField')}
          label={t('code')}
          labelPlacement="outside"
          name="code"
          placeholder={t('codePlaceholder')}
          defaultValue={state.code}
          type="text"
          autoComplete="one-time-code"
        />

        <Button type="submit" color="primary" fullWidth={true} isLoading={isPending}>
          {t('resetPasswordButton')}
        </Button>
      </Form>
    </>
  );
};

export default ResetForm;
