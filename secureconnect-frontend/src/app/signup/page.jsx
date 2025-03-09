"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    special: false,
  });
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();

  // Check password requirements whenever password changes
  useEffect(() => {
    setPasswordRequirements({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  // Check username requirements
  useEffect(() => {
    if (isFocused.username || username.length > 0) {
      if (username.length < 8) {
        setErrors(prev => ({ ...prev, username: 'Username must be at least 8 characters long' }));
      } else {
        setErrors(prev => ({ ...prev, username: '' }));
      }
    }
  }, [username, isFocused.username]);

  // Check confirm password match
  useEffect(() => {
    if (isFocused.confirmPassword || confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  }, [password, confirmPassword, isFocused.confirmPassword]);


  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailability, setUsernameAvailability] = useState(null);
  const router = useRouter();

  // Validation function

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 8) {
      newErrors.username = 'Username must be at least 8 characters long';
    } else if (usernameAvailability === false) {
      newErrors.username = 'Username is already taken';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRequirements.lowercase || !passwordRequirements.uppercase || !passwordRequirements.special) {
      newErrors.password = 'Password must meet all requirements';
    }

    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    


    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check username availability with debounce
  useEffect(() => {
    // Clear previous username availability status when username changes
    setUsernameAvailability(null);
    
    // Don't check if username is too short
    if (!username || username.length < 8) {
      return;
    }
    
    // Set a timeout to prevent too many API calls while typing
    const timeout = setTimeout(async () => {
      setIsCheckingUsername(true);
      try {
        const response = await fetch(`http://localhost:5000/api/auth/check-username/${username}`);
        const data = await response.json();
        setUsernameAvailability(data.available);
      } catch (error) {
        console.error('Error checking username availability:', error);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500); // 500ms debounce

    // Cleanup function to clear the timeout if component unmounts or username changes
    return () => clearTimeout(timeout);
  }, [username]);

  // Real-time validation with useEffect
  useEffect(() => {
    validate();
  }, [username, password, confirmPassword, usernameAvailability]);

  // Handle input changes
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (validate()) {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
  };

  const handleFocus = (field) => () => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => () => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
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
            Sign Up
          </h1>
          
          {success && (
            <div className="bg-green-900/50 text-green-300 p-3 mb-6 rounded-lg border border-green-800 animate-fadeIn flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Signup successful! Redirecting to login...
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
                  onFocus={handleFocus('username')}
                  onBlur={handleBlur('username')}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-lg 
                            text-gray-200 outline-none transition-all duration-300 
                            focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter your username (min. 8 characters)"
                />
                {(isFocused.username || username.length > 0) && (
                  <p className={`text-sm mt-1 animate-fadeIn ${username.length >= 8 ? 'text-green-400' : 'text-pink-500'}`}>
                    {username.length >= 8 ? '✓ Username is valid' : 'Username must be at least 8 characters long'}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={handleChange('password')}
                  onFocus={handleFocus('password')}
                  onBlur={handleBlur('password')}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-lg 
                            text-gray-200 outline-none transition-all duration-300 
                            focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Create a strong password"
                />
                
                {(isFocused.password || password.length > 0) && (
                  <div className="mt-2 space-y-1 bg-gray-800/70 p-3 rounded-lg border border-gray-700 animate-fadeIn">
                    <p className="text-sm font-medium text-gray-300 mb-1">Password requirements:</p>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <span className={`mr-2 ${passwordRequirements.lowercase ? 'text-green-400' : 'text-pink-500'}`}>
                          {passwordRequirements.lowercase ? '✓' : '○'}
                        </span>
                        <span className={passwordRequirements.lowercase ? 'text-green-400' : 'text-gray-400'}>
                          At least one lowercase letter
                        </span>
                      </li>
                      <li className="flex items-center text-sm">
                        <span className={`mr-2 ${passwordRequirements.uppercase ? 'text-green-400' : 'text-pink-500'}`}>
                          {passwordRequirements.uppercase ? '✓' : '○'}
                        </span>
                        <span className={passwordRequirements.uppercase ? 'text-green-400' : 'text-gray-400'}>
                          At least one uppercase letter
                        </span>
                      </li>
                      <li className="flex items-center text-sm">
                        <span className={`mr-2 ${passwordRequirements.special ? 'text-green-400' : 'text-pink-500'}`}>
                          {passwordRequirements.special ? '✓' : '○'}
                        </span>
                        <span className={passwordRequirements.special ? 'text-green-400' : 'text-gray-400'}>
                          At least one special character
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
                <PasswordStrengthIndicator password={password} />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onFocus={handleFocus('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-lg 
                            text-gray-200 outline-none transition-all duration-300 
                            focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Confirm your password"
                />
                {(isFocused.confirmPassword || confirmPassword.length > 0) && (
                  <p className={`text-sm mt-1 animate-fadeIn ${confirmPassword && password === confirmPassword ? 'text-green-400' : 'text-pink-500'}`}>
                    {confirmPassword && password === confirmPassword ? '✓ Passwords match' : 'Passwords do not match'}
                  </p>
                )}
              </div>
            </div>

            {generalError && (
            <div className="bg-red-900/50 text-red-300 p-3 mb-6 rounded-lg border border-red-800 animate-fadeIn flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              {generalError}
            </div>
          )}
            
            <button
              type="submit"
              disabled={
                username.length < 8 || 
                !passwordRequirements.lowercase || 
                !passwordRequirements.uppercase || 
                !passwordRequirements.special || 
                password !== confirmPassword ||
                isLoading
              }
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
                  Creating account...
                </span>
              ) : "Sign Up"}
            </button>
            
            <div className="pt-2 text-center">
              <a href="/login" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                Already have an account? Log in
              </a>
            </div>
          </form>
        </div>
      </div>

  // Username availability indicator
  const renderUsernameAvailability = () => {
    if (username.length < 8) return null;
    
    if (isCheckingUsername) {
      return <p className="text-gray-500 text-sm mt-1">Checking availability...</p>;
    }
    
    if (usernameAvailability === true) {
      return <p className="text-green-500 text-sm mt-1">Username is available!</p>;
    }
    
    if (usernameAvailability === false) {
      return <p className="text-red-500 text-sm mt-1">Username is already taken</p>;
    }
    
    return null;
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
          {renderUsernameAvailability()}
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
          disabled={Object.keys(errors).length > 0 || !username || !password || !confirmPassword || isCheckingUsername || usernameAvailability === false}
        >
          Sign Up
        </button>
      </form>

    </div>
  );
}

function PasswordStrengthIndicator({ password }) {
  if (!password) return null; // Do not render anything if password is empty

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
  
  if (!password) return null;
  
  return (
    <div className="mt-2">
      <div className="flex items-center mb-1">
        <span className="text-sm text-gray-300 mr-2">Password strength:</span>
        <span className={`text-sm font-medium ${
          strength === 'Weak' ? 'text-red-400' : 
          strength === 'Medium' ? 'text-yellow-400' : 
          'text-green-400'
        }`}>
          {strength}
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${
            strength === 'Weak' ? 'bg-red-500 w-1/3' : 
            strength === 'Medium' ? 'bg-yellow-500 w-2/3' : 
            'bg-green-500 w-full'
          } transition-all duration-300`}
        ></div>
      </div>
    </div>
  );
}
