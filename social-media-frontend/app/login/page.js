'use client';

import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useRouter } from 'next/navigation'; 

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (data) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    if (res.ok) {
      localStorage.setItem('token', responseData.token);
      router.push('/'); 
    } else {
      setErrorMessage(responseData.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <AuthForm isLogin={true} onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
