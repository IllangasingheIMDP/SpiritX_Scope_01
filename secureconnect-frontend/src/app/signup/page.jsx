"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!username || username.length < 8) {
      newErrors.username = 'Username must be at least 8 characters long';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (!hasLowercase || !hasUppercase || !hasSpecial) {
        newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one special character';
      }
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (validate()) {
      try {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, confirmPassword }),
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess(true);
          setTimeout(() => router.push('/login'), 2000);
        } else {
          setGeneralError(data.error || 'Error signing up');
        }
      } catch (error) {
        setGeneralError('Error signing up');
      }
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
    validate(); // Real-time validation
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      {success && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          Signup successful! Redirecting to login...
        </div>
      )}
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
          <PasswordStrengthIndicator password={password} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleChange('confirmPassword')}
            className="border p-2 w-full rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={Object.keys(errors).length > 0 || !username || !password || !confirmPassword}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

function PasswordStrengthIndicator({ password }) {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
  };

  const strength = getStrength();
  const color = strength === 'Weak' ? 'red' : strength === 'Medium' ? 'yellow' : 'green';

  return (
    <p className={`text-${color}-500 text-sm mt-1`}>Password strength: {strength}</p>
  );
}