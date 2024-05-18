"use client"

import React, { useState } from 'react';
import Form from './Form';
import ThankYou from './ThankYou';

export default function Switch() {
  const [ isSuccess, setIsSuccess ] = useState(false);

  if (isSuccess) {
    return <ThankYou />;
  }

  return <Form onSuccess={() => setIsSuccess(true)} />;
}
