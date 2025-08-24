import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SignUpForm from './signUp/form';
import useAuth from '../utils/useAuth';
import ConfirmForm from './signUp/confirmForm';
import ThankYou from './signUp/thankYou';
import logger from '../logger';

export function meta() {
  return [{ title: "Sign Up | Zdielaj.si" }, { name: "description", content: "Sign Up" }];
}

export function links() {
  return [
    { rel: "alternate", href: "https://zdielaj.si/en/sign-up", hrefLang: "en" },
    { rel: "alternate", href: "https://zdielaj.si/sk/zaregistrovat-sa", hrefLang: "sk" },
  ];
}

export default function SignUp() {
  const { t } = useTranslation('', { keyPrefix: 'signUp' });
  const { signUp, confirmSignUp } = useAuth();
  const [ username, setUsername ] = useState('');
  const [ step, setStep ] = useState<'form' | 'confirm' | 'thankYou'>('form');

  const onSubmit = useCallback(async (name: string, email: string, password: string): Promise<void> => {
    await signUp(name, email, password);
    
    setUsername(email);
    setStep('confirm');
  }, [ signUp, setUsername ]);

  const onConfirm = useCallback(async (code: string) => {
    await confirmSignUp(username, code);

    setStep('thankYou');
  }, [ confirmSignUp, username ]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {t('title')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {
          step === 'form' ? (
            <SignUpForm signUp={onSubmit} />
          ) : step === 'confirm' ? (
            <ConfirmForm onConfirmSubmit={onConfirm} />
          ) : (
            <ThankYou />
          )
        }
      </div>
    </div>
  );
}
