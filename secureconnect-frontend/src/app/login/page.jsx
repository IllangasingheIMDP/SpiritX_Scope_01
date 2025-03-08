"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const router = useRouter();

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time validation with useEffect
  useEffect(() => {
    validate();
  }, [username, password]);

  // Handle input changes
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (validate()) {
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
          credentials: 'include', // Required for cookies
        });
        const data = await res.json();
        if (res.ok) {
          router.push('/');
        } else {
          setGeneralError(data.error || 'Error logging in');
        }
      } catch (error) {
        setGeneralError('Error logging in');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      {generalError && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {generalError}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={handleChange('username')}
            className="border p-2 w-full rounded"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={handleChange('password')}
            className="border p-2 w-full rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={Object.keys(errors).length > 0 || !username || !password}
        >
          Login
        </button>
      </form>
    </div>
  );
}