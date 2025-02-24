import { useState } from 'react';
import type { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import RegisterForm from './register/RegisterForm';
import ConfirmForm from  './register/ConfirmForm';
import ThankYou from './register/ThankYou';
import SEO from '../components/SEO';
import { register, confirmRegister } from '../api/services';

const Register: FunctionComponent = () => {
  const [ step, setStep ] = useState(0);
  const [ username, setUsername ] = useState('');
  
  const onRegisterSubmit = (username: string, password: string, meta: Record<string, string | number | boolean>) => {
    return register(username, password, meta)
      .then(() => {
        setStep(1);
        setUsername(username);
      });
  };

  const onConfirmSubmit = (code: string) => {
    return confirmRegister(username, code)
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
