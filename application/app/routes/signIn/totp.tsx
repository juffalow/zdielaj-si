import { useActionState } from 'react';
import { Form, InputOtp, Button, Alert } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export default function SignInTOTP({
  onSubmit,
}: {
  onSubmit: (prevState: unknown, state: FormData) => Promise<{ totpCode: string; error: string | null }>;
}) {
  const { t } = useTranslation('', { keyPrefix: 'signIn.totp' });
  const [state, formAction, isPending] = useActionState(onSubmit, {
    totpCode: '',
    error: null,
  });

  return (
    <Form action={formAction} className="space-y-6">
      <InputOtp isRequired errorMessage={t('requiredField')} name="totpCode" length={6} />

      {state.error !== null ? <Alert color="danger" title={state.error} hideIcon={true} /> : null}

      <Button type="submit" color="primary" fullWidth={true} isLoading={isPending}>
        {t('confirmSignInButton')}
      </Button>
    </Form>
  );
}
