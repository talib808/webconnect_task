'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthForm = ({ isLogin: initialIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = isLogin ? { email, password } : { username, email, password };

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong.');
        return;
      }

    
      if (isLogin) {
        localStorage.setItem('token', data.token); 
        router.push('/PostForm'); 
      } else {
        setIsLogin(true); 
        alert('Registration successful! Please log in.'); 
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
      console.error('Error:', error);
    }
  };

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 mb-4 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        
        {!isLogin && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        
        <button
          type="button"
          onClick={handleToggle}
          className="w-full text-blue-500 hover:underline mt-4"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
