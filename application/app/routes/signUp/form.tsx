import { useActionState, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Alert,
} from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { ZodError } from 'zod';
import { signUpFormSchema } from './formValidation';
import logger from '../../logger';

export default function SignUpForm({
  signUp,
}: {
  signUp: (name: string, email: string, password: string) => Promise<void>;
}) {
  const { t } = useTranslation('', { keyPrefix: 'signUp.form' });
  const [password, setPassword] = useState('');

  const onSubmit = async (_: unknown, state: FormData) => {
    const name = state.get('name') as string;
    const email = state.get('email') as string;
    const password = state.get('password') as string;

    try {
      signUpFormSchema.parse({ name, email, password });

      await signUp(name, email, password);
    } catch (err) {
      logger.error('Unable to sign up!', { error: err });

      if (err instanceof ZodError) {
        return { name, email, password, error: err.issues.map((issue) => issue.message).join(',') };
      }

      if (typeof err === 'object' && err !== null && 'name' in err && err.name === 'UsernameExistsException') {
        return { name, email, password, error: t('errors.userAlreadyExists') };
      }

      return { name, email, password, error: t('errors.default') };
    }

    return { name, email, password, error: null };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, {
    name: "",
    email: "",
    password: "",
    error: null,
  });

  return (
    <Form action={formAction} className="space-y-6">
      <Input
        isRequired
        errorMessage={t('requiredField')}
        label={t('name')}
        labelPlacement="outside"
        name="name"
        placeholder={t('namePlaceholder')}
        defaultValue={state.name}
        type="text"
      />

      <Input
        isRequired
        errorMessage={t('requiredField')}
        label={t('email')}
        labelPlacement="outside"
        name="email"
        placeholder={t('emailPlaceholder')}
        defaultValue={state.email}
        type="email"
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
        onChange={(e) => setPassword(e.target.value)}
        description={<ul className="list-disc list-inside">
          <li>{t("passwordRules.minEightCharacters")} { password.length >= 8 ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
          <li>{t("passwordRules.atLeastOneUppercase")} { password.toLowerCase() !== password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
          <li>{t("passwordRules.atLeastOneLowercase")} { password.toUpperCase() !== password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
          <li>{t("passwordRules.atLeastOneSpecialCharacter")} { password.match(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
          <li>{t("passwordRules.atLeastOneNumber")} { password.match(/\d/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
        </ul>}
      />

      {state.error !== null ? (
        <Alert color="danger" description={state.error.split(',').map((error) => <p key={error}>{error}!</p>)} hideIcon={true} />
      ) : null}

      <Button type="submit" color="primary" fullWidth={true} isDisabled={isPending}>
        {t('signUpButton')}
      </Button>
    </Form>
  );
}
