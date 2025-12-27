import { useActionState } from 'react';
import { Form, Input, Button, Alert } from '@heroui/react';
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

      {state.error !== null ? <Alert color="danger" title={state.error} hideIcon={true} /> : null}

      <Button type="submit" color="primary" fullWidth={true} isLoading={isPending}>
        {t('signInButton')}
      </Button>
    </Form>
  );
}
