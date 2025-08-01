import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ZodError } from 'zod';
import SignInForm from './signIn/form';
import { signInFormSchema } from './signIn/formValidation';
import useAuth from '../utils/useAuth';
import logger from '../logger';

export function meta() {
  return [{ title: "Sign In" }, { name: "description", content: "Sign In" }];
}

export default function SignIn() {
  const { t } = useTranslation('', { keyPrefix: 'signIn' });
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (prevState: unknown, state: FormData): Promise<{ email: string, password: string, error: string | null }> => {
    const email = state.get('email') as string;
    const password = state.get('password') as string;
    let error = null;

    try {
      signInFormSchema.parse({ email, password });
    } catch (err) {
      logger.error('Unable to sign in!', { error: err });

      if (err instanceof ZodError) {
        return { email, password, error: err.issues.map((issue) => issue.message).join(', ') };
      }

      return { email, password, error: 'Unable to sign in!' };
    }

    await signIn(email, password)
      .then(() => {
        setTimeout(() => navigate('/'), 100);
      })
      .catch((err) => {
        logger.error('Unable to sign in!', { error: { message: err.message, stack: err.stack } });
        error = err.message;
      });

    return { email, password, error };
  }, [ signIn ]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {t('title')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignInForm onSubmit={onSubmit} />

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {t('noAccount')}
          <Link to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signUp', { keyPrefix: 'routes' })}`} className="font-semibold text-indigo-600 hover:text-indigo-500 ms-1">
            {t('signUp')}
          </Link>
        </p>
      </div>
    </div>
  );
}
