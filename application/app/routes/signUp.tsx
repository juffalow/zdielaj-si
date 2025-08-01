import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ZodError } from 'zod';
import SignUpForm from './signUp/form';
import useAuth from '../utils/useAuth';
import { signUpFormSchema } from './signUp/formValidation';
import logger from '../logger';

export function meta() {
  return [{ title: "Sign Up" }, { name: "description", content: "Sign Up" }];
}

export default function SignUp() {
  const { t } = useTranslation('', { keyPrefix: 'signUp' });
  const { signUp } = useAuth();

  const onSubmit = useCallback(async (prevState: unknown, state: FormData): Promise<{ name: string, email: string, password: string, error: string | null }> => {
    const name = state.get('name') as string;
    const email = state.get('email') as string;
    const password = state.get('password') as string;
    let error = null;

    try {
      signUpFormSchema.parse({ name, email, password });
    } catch (err) {
      logger.error('Unable to sign up!', { error: err });

      if (err instanceof ZodError) {
        return { name, email, password, error: err.issues.map((issue) => issue.message).join(',') };
      }

      return { name, email, password, error: 'Unable to sign up!' };
    }

    return { name, email, password, error: null };
  }, []);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {t('title')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignUpForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
