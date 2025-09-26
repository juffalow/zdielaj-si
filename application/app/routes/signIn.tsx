import { useState, useCallback } from 'react';
import type { Route } from './+types/signIn';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ZodError } from 'zod';
import SignInForm from './signIn/form';
import SignInTOTP from './signIn/totp';
import { signInFormSchema } from './signIn/formValidation';
import GoogleSignIn from './signIn/google';
import useAuth from '../utils/useAuth';
import logger from '../logger';
import { ROUTES } from '../constants';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  switch (language) {
    case 'sk': return [{ title: "Prihlásiť sa | Zdielaj.si" }];
    case 'cz': return [{ title: "Přihlásit se | Zdielaj.si" }];
    case 'de': return [{ title: "Anmelden | Zdielaj.si" }];
    case 'es': return [{ title: "Iniciar sesión | Zdielaj.si" }];
    case 'fr': return [{ title: "Se connecter | Zdielaj.si" }];
    case 'it': return [{ title: "Accedi | Zdielaj.si" }];
    case 'pl': return [{ title: "Zaloguj się | Zdielaj.si" }];
    case 'nl': return [{ title: "Inloggen | Zdielaj.si" }];
    case 'si': return [{ title: "Prijava | Zdielaj.si" }];
    case 'fi': return [{ title: "Kirjaudu sisään | Zdielaj.si" }];
    case 'se': return [{ title: "Logga in | Zdielaj.si" }];
    case 'no': return [{ title: "Logg inn | Zdielaj.si" }];
    case 'dk': return [{ title: "Log ind | Zdielaj.si" }];
    case 'hu': return [{ title: "Bejelentkezés | Zdielaj.si" }];
    case 'en':
    default:
      return [{ title: "Sign in | Zdielaj.si" }];
  }
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
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="/zdielaj-si.png"
          alt="Zdielaj.si"
          className="mx-auto h-40 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {t('title')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {step === 'form' ? <SignInForm onSubmit={onSubmit} /> : <SignInTOTP onSubmit={onTOTPSubmit} />}

        <div className="mt-10">
          <GoogleSignIn />
        </div>

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
