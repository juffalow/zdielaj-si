import { useState } from 'react';
import type { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import RegisterForm from './register/RegisterForm';
import ConfirmForm from  './register/ConfirmForm';
import ThankYou from './register/ThankYou';
import SEO from '../components/SEO';
import useAuth from '../utils/useAuth';

const Register: FunctionComponent = () => {
  const [ step, setStep ] = useState(0);
  const [ username, setUsername ] = useState('');
  const { signUp, confirmSignUp } = useAuth();
  
  const onRegisterSubmit = (username: string, password: string, meta: Record<string, string | number | boolean>) => {
    return signUp(meta.name as string, username, password)
      .then(() => {
        setStep(1);
        setUsername(username);
      });
  };

  const onConfirmSubmit = (code: string) => {
    return confirmSignUp(username, code)
      .then(() => {
        setStep(2);
      });
  };

  return (
    <SEO title="Registrácia" description="">
      <Container className="main">
        {
          step === 0 ? (
            <RegisterForm onRegisterSubmit={onRegisterSubmit} />
          ) : null
        }
        {
          step === 1 ? (
            <ConfirmForm onConfirmSubmit={onConfirmSubmit} />
          ) : null
        }
        {
          step === 2 ? (
            <ThankYou />
          ) : null
        }
      </Container>
    </SEO>
  );
};

export default Register;
