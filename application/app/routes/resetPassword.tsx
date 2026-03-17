import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import RequestResetForm from './resetPassword/RequestResetForm';
import ResetForm from './resetPassword/ResetForm';
import useAuth from '../utils/useAuth';
import { ROUTES } from '../constants';

const ResetPassword: FunctionComponent = () => {
  const { i18n, t } = useTranslation('', { keyPrefix: 'resetPassword' });
  const navigate = useNavigate();
  const [ step, setStep ] = useState(0);
  const [ username, setUsername ] = useState('');
  const { resetPassword, confirmResetPassword } = useAuth();
  
  const onRequestSubmit = (username: string) => {
    return resetPassword(username)
      .then(() => {
        setStep(1);
        setUsername(username);
      });
  };

  const onResetSubmit = (password: string, code: string) => {
    return confirmResetPassword(username, code, password)
      .then(() => {
        navigate(`/${ROUTES[i18n.language as keyof typeof ROUTES].prefix}${ROUTES[i18n.language as keyof typeof ROUTES].signIn}`);
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="/zdielaj-si.png" alt="Zdielaj.si" className="mx-auto h-40 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{t('title')}</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {
          step === 0 ? (
            <RequestResetForm onRequestSubmit={onRequestSubmit} />
          ) : null
        }
        {
          step === 1 ? (
            <ResetForm username={username} onResetSubmit={onResetSubmit} />
          ) : null
        }
      </div>
    </div>
  );
};

export default ResetPassword;
