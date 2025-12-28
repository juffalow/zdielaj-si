import { useState, useCallback } from 'react';
import type { Route } from './+types/signUp';
import { useTranslation } from 'react-i18next';
import SignUpForm from './signUp/form';
import useAuth from '../utils/useAuth';
import useTracking from '../utils/useTracking';
import GoogleSignUp from './signUp/google';
import ConfirmForm from './signUp/confirmForm';
import ThankYou from './signUp/thankYou';
import { ROUTES } from '../constants';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  switch (language) {
    case 'sk':
      return [{ title: 'Zaregistrovať sa | Zdielaj.si' }];
    case 'cz':
      return [{ title: 'Zaregistrovat se | Zdielaj.si' }];
    case 'de':
      return [{ title: 'Registrieren | Zdielaj.si' }];
    case 'es':
      return [{ title: 'Registrarse | Zdielaj.si' }];
    case 'fr':
      return [{ title: "S'inscrire | Zdielaj.si" }];
    case 'it':
      return [{ title: 'Registrati | Zdielaj.si' }];
    case 'pl':
      return [{ title: 'Zarejestruj się | Zdielaj.si' }];
    case 'nl':
      return [{ title: 'Registreren | Zdielaj.si' }];
    case 'si':
      return [{ title: 'Registracija | Zdielaj.si' }];
    case 'fi':
      return [{ title: 'Rekisteröidy | Zdielaj.si' }];
    case 'se':
      return [{ title: 'Registrera dig | Zdielaj.si' }];
    case 'no':
      return [{ title: 'Registrer deg | Zdielaj.si' }];
    case 'dk':
      return [{ title: 'Tilmeld dig | Zdielaj.si' }];
    case 'hu':
      return [{ title: 'Regisztráció | Zdielaj.si' }];
    case 'en':
    default:
      return [{ title: 'Sign up | Zdielaj.si' }];
  }
}

export function links() {
  return [
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.en.prefix}${ROUTES.en.signUp}`, hrefLang: 'en' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.sk.prefix}${ROUTES.sk.signUp}`, hrefLang: 'sk' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.cz.prefix}${ROUTES.cz.signUp}`, hrefLang: 'cz' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.de.prefix}${ROUTES.de.signUp}`, hrefLang: 'de' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.es.prefix}${ROUTES.es.signUp}`, hrefLang: 'es' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.fr.prefix}${ROUTES.fr.signUp}`, hrefLang: 'fr' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.it.prefix}${ROUTES.it.signUp}`, hrefLang: 'it' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.pl.prefix}${ROUTES.pl.signUp}`, hrefLang: 'pl' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.nl.prefix}${ROUTES.nl.signUp}`, hrefLang: 'nl' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.si.prefix}${ROUTES.si.signUp}`, hrefLang: 'si' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.fi.prefix}${ROUTES.fi.signUp}`, hrefLang: 'fi' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.se.prefix}${ROUTES.se.signUp}`, hrefLang: 'se' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.no.prefix}${ROUTES.no.signUp}`, hrefLang: 'no' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.dk.prefix}${ROUTES.dk.signUp}`, hrefLang: 'dk' },
    { rel: 'alternate', href: `https://zdielaj.si/${ROUTES.hu.prefix}${ROUTES.hu.signUp}`, hrefLang: 'hu' },
  ];
}

export default function SignUp() {
  const { t } = useTranslation('', { keyPrefix: 'signUp' });
  const { signUp, confirmSignUp } = useAuth();
  const [username, setUsername] = useState('');
  const [step, setStep] = useState<'form' | 'confirm' | 'thankYou'>('form');
  const { trackEvent } = useTracking();

  const onSubmit = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      await signUp(name, email, password);

      setUsername(email);
      setStep('confirm');
    },
    [signUp, setUsername]
  );

  const onConfirm = useCallback(
    async (code: string) => {
      await confirmSignUp(username, code);

      setStep('thankYou');
      trackEvent('sign_up', { type: 'email' });
    },
    [confirmSignUp, username]
  );

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="/zdielaj-si.png" alt="Zdielaj.si" className="mx-auto h-40 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{t('title')}</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {step === 'form' ? (
          <>
            <GoogleSignUp />
            <SignUpForm signUp={onSubmit} />
          </>
        ) : step === 'confirm' ? (
          <ConfirmForm onConfirmSubmit={onConfirm} />
        ) : (
          <ThankYou />
        )}
      </div>
    </div>
  );
}
