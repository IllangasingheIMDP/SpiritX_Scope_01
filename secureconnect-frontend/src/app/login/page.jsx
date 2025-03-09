"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    // Clear the error for this field when typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="backdrop-blur-sm bg-gray-900/80 p-8 rounded-xl border border-gray-800 shadow-2xl shadow-purple-900/20 transition-all duration-500 hover:shadow-purple-700/30 relative z-10">
          
          <h1 className="text-3xl font-bold mb-6 text-center text-white 
                         bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                         bg-clip-text text-transparent">
            Login
          </h1>
          
          {generalError && (
            <div className="bg-red-900/50 text-red-300 p-3 mb-6 rounded-lg border border-red-800 animate-fadeIn flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              {generalError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={handleChange('username')}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-lg 
                            text-gray-200 outline-none transition-all duration-300 
                            focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter your username"
                />
                {errors.username && 
                  <p className="text-pink-500 text-sm mt-1 animate-fadeIn">
                    {errors.username}
                  </p>
                }
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={handleChange('password')}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-lg 
                            text-gray-200 outline-none transition-all duration-300 
                            focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter your password"
                />
                {errors.password && 
                  <p className="text-pink-500 text-sm mt-1 animate-fadeIn">
                    {errors.password}
                  </p>
                }
              </div>
            </div>
            
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || !username || !password || isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-500 
                        text-white font-medium rounded-lg 
                        transition-all duration-300 transform 
                        hover:translate-y-[-2px] hover:shadow-lg hover:shadow-purple-500/30
                        focus:outline-none focus:ring-2 focus:ring-purple-500 
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                        disabled:hover:shadow-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : "Login"}
            </button>
            
            <div className="pt-2 text-center">
              <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}