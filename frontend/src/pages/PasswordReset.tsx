import { useState } from 'react';
import type { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import RequestResetForm from './passwordReset/RequestResetForm';
import ResetForm from './passwordReset/ResetForm';
import SEO from '../components/SEO';
import { requestPasswordReset, resetPassword } from '../api/services';

const PasswordReset: FunctionComponent = () => {
  const navigate = useNavigate();
  const [ step, setStep ] = useState(0);
  const [ username, setUsername ] = useState('');
  
  const onRequestSubmit = (username: string) => {
    return requestPasswordReset(username)
      .then(() => {
        setStep(1);
        setUsername(username);
      });
  };

  const onResetSubmit = (password: string, code: string) => {
    return resetPassword(username, password, code)
      .then(() => {
        navigate('/prihlasit-sa');
      });
  };

  return (
    <SEO title="Resetovať heslo" description="">
      <Container className="main" style={{ marginTop: 50 }}>
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
      </Container>
    </SEO>
  );
};

export default PasswordReset;
