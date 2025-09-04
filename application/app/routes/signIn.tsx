import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ZodError } from 'zod';
import SignInForm from './signIn/form';
import SignInTOTP from './signIn/totp';
import { signInFormSchema } from './signIn/formValidation';
import useAuth from '../utils/useAuth';
import logger from '../logger';
import { ROUTES } from '../constants';

export function meta() {
  return [{ title: "Sign In | Zdielaj.si" }, { name: "description", content: "Sign In" }];
}

export function links() {
  return [
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.en.prefix}${ROUTES.en.signIn}`, hrefLang: "en" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.sk.prefix}${ROUTES.sk.signIn}`, hrefLang: "sk" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.cz.prefix}${ROUTES.cz.signIn}`, hrefLang: "cz" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.de.prefix}${ROUTES.de.signIn}`, hrefLang: "de" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.es.prefix}${ROUTES.es.signIn}`, hrefLang: "es" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.fr.prefix}${ROUTES.fr.signIn}`, hrefLang: "fr" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.it.prefix}${ROUTES.it.signIn}`, hrefLang: "it" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.pl.prefix}${ROUTES.pl.signIn}`, hrefLang: "pl" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.nl.prefix}${ROUTES.nl.signIn}`, hrefLang: "nl" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.si.prefix}${ROUTES.si.signIn}`, hrefLang: "si" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.fi.prefix}${ROUTES.fi.signIn}`, hrefLang: "fi" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.se.prefix}${ROUTES.se.signIn}`, hrefLang: "se" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.no.prefix}${ROUTES.no.signIn}`, hrefLang: "no" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.dk.prefix}${ROUTES.dk.signIn}`, hrefLang: "dk" },
    { rel: "alternate", href: `https://zdielaj.si/${ROUTES.hu.prefix}${ROUTES.hu.signIn}`, hrefLang: "hu" },
  ];
}

export default function SignIn() {
  const { t } = useTranslation('', { keyPrefix: 'signIn' });
  const { signIn, confirmSignIn } = useAuth();
  const navigate = useNavigate();
  const [ step, setStep ] = useState<'form' | 'totp'>('form');

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
      .then((response) => {
        if (response.isSuccess === false) {
          setStep('totp');
        } else {
          setTimeout(() => navigate('/'), 100);
        }
      })
      .catch((err) => {
        logger.error('Unable to sign in!', { error: { message: err.message, stack: err.stack } });
        error = err.message;
      });

    return { email, password, error };
  }, [ signIn ]);

  const onTOTPSubmit = useCallback(async (prevState: unknown, state: FormData): Promise<{ totpCode: string, error: string | null }> => {
    const totpCode = state.get('totpCode') as string;
    let error = null;

    await confirmSignIn(totpCode)
      .then(() => {
        setTimeout(() => navigate('/'), 100);
      })
      .catch((err) => {
        logger.error('Unable to confirm sign in!', { error: { message: err.message, stack: err.stack } });
        error = err.message;
      });

    return { totpCode, error };
  }, [ confirmSignIn ]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Zdielaj.si"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {t('title')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {step === 'form' ? <SignInForm onSubmit={onSubmit} /> : <SignInTOTP onSubmit={onTOTPSubmit} />}

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
