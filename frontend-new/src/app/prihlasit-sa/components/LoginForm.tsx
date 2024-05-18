"use client"

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '../../../utils/useAuth';

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword  ] = useState('');

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      signIn(email, password)
        .then(() => {
          router.push('/');
        })
        .catch(() => {
          setErrorMessage('Nesprávne prihlasovacie meno alebo heslo!');
          setHasError(true);
          setIsValidated(false);
        });
    }
  };

  return (
    <>
      {
        hasError ? (
          <Alert variant={'danger'}>
            {errorMessage}
          </Alert>
        ) : null
      }
      <Form noValidate validated={isValidated} onSubmit={onSubmit}>
        <Form.Group controlId="loginEmail">
          <Form.Label>E-mailová adresa</Form.Label>
          <Form.Control required type="email" placeholder="Zadaj e-mail" value={email} onChange={onEmailChange} />
          <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="loginPassword" className="mt-3">
          <Form.Label>Heslo</Form.Label>
          <Form.Control required type="password" placeholder="Zadaj heslo" value={password} onChange={onPasswordChange} />
          <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
        </Form.Group>

        <p className="mt-3">Ešte tu nemáš účet? Môžeš si ho vytvoriť <Link href="/registracia">tu</Link>.</p>

        <Button variant="primary" type="submit">
          Prihlásiť sa
        </Button>
      </Form>
    </>
  );
}
