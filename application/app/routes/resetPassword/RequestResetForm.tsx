import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { Form, Input, Button, Alert } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import logger from '~/logger';

interface Props {
  onRequestSubmit: (username: string) => Promise<void>;
}

const RequestResetForm: FunctionComponent<Props> = ({ onRequestSubmit }: Props) => {
  const { t } = useTranslation('', { keyPrefix: 'resetPassword.requestResetForm' });

  const onSubmit = async (_: unknown, state: FormData): Promise<{ email: string; error: string | null }> => {
    const email = state.get('email') as string;
    let error = null;

    try {
      await onRequestSubmit(email)
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error('Unable to request reset password!', { error: { message: err.message, stack: err.stack } });
        error = err.message;
      } else {
        logger.error('Unable to request reset password!', { error: err });
        error = 'Unable to request reset password!';
      }
    }

    return { email, error };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, {
    email: '',
    error: null,
  });

  return (
    <>
      <p className="text-center mb-5">{t('description')}</p>
      {
        state.error !== null ? (
          <Alert color="danger" title={state.error} hideIcon={true} />
        ) : null
      }

      <Form action={formAction} className="space-y-6">
        <Input
          isRequired
          errorMessage={t('requiredField')}
          label={t('email')}
          labelPlacement="outside"
          name="email"
          placeholder={t('emailPlaceholder')}
          defaultValue={state.email}
          type="text"
          autoComplete="email"
        />

        <Button type="submit" color="primary" fullWidth={true} isLoading={isPending}>
          {t('requestResetButton')}
        </Button>
      </Form>
    </>
  );
};

export default RequestResetForm;
