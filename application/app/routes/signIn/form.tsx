import { useActionState } from 'react';
import { Form, TextField, Label, Input, FieldError, Button, Alert, Spinner } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export default function SignInForm({
  onSubmit,
}: {
  onSubmit: (prevState: unknown, state: FormData) => Promise<{ email: string; password: string; error: string | null }>;
}) {
  const { t } = useTranslation('', { keyPrefix: 'signIn.form' });
  const [state, formAction, isPending] = useActionState(onSubmit, {
    email: '',
    password: '',
    error: null,
  });

  return (
    <Form action={formAction} className="space-y-6">
      <TextField isRequired name="email" type="text" defaultValue={state.email}>
        <Label>{t('email')}</Label>
        <Input placeholder={t('emailPlaceholder')} autoComplete="email" />
        <FieldError>{t('requiredField')}</FieldError>
      </TextField>

      <TextField isRequired name="password" type="password" defaultValue={state.password}>
        <Label>{t('password')}</Label>
        <Input placeholder={t('passwordPlaceholder')} autoComplete="current-password" />
        <FieldError>{t('requiredField')}</FieldError>
      </TextField>

      {state.error !== null ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Title>{state.error}</Alert.Title>
          </Alert.Content>
        </Alert>
      ) : null}

      <Button type="submit" variant="primary" fullWidth={true} isPending={isPending}>
        {({ isPending }) => (
          <>
            {isPending && <Spinner color="current" size="sm" />}
            {t('signInButton')}
          </>
        )}
      </Button>
    </Form>
  );
}
