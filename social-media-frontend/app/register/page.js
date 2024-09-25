'use client';
import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (data) => {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    if (res.ok) {
      // Save token to localStorage or state management
      localStorage.setItem('token', responseData.token);
      router.push('/'); // Redirect to home page
    } else {
      setErrorMessage(responseData.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <AuthForm isLogin={false} onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
