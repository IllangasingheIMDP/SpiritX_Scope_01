function validateUsername(username) {
    if (!username || username.length < 8) {
      return 'Username must be at least 8 characters long';
    }
    return null;
  }
  
  function validatePassword(password) {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasLowercase || !hasUppercase || !hasSpecial) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, and one special character';
    }
    return null;
  }
  
  function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  }
  
  module.exports = {
    validateUsername,
    validatePassword,
    validateConfirmPassword
  };