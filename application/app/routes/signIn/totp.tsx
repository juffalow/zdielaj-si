import { useActionState } from 'react';
import { Form, InputOTP, Button, Alert, FieldError } from '@heroui/react';
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
      <InputOTP required isInvalid name="totpCode" maxLength={6} className="mx-auto">
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

      {state.error !== null ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Description>{state.error}</Alert.Description>
          </Alert.Content>
        </Alert>
      ) : null}

      <Button type="submit" variant="primary" fullWidth={true} isDisabled={isPending}>
        {t('confirmSignInButton')}
      </Button>
    </Form>
  );
}
