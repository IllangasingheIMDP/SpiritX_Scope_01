const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateUsername, validatePassword, validateConfirmPassword } = require('../utils/validation');

const signup = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Validate inputs
  const usernameError = validateUsername(username);
  if (usernameError) return res.status(400).json({ error: usernameError });

  const passwordError = validatePassword(password);
  if (passwordError) return res.status(400).json({ error: passwordError });

  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) return res.status(400).json({ error: confirmPasswordError });

  // Check username uniqueness
  const existingUser = await User.findByUsername(username);
  if (existingUser) return res.status(400).json({ error: 'Username already exists' });

  // Hash password and create user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.create(username, hashedPassword);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findByUsername(username);
  if (!user) return res.status(400).json({ error: 'Invalid username or password' });

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

  // Generate JWT and set cookie
  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure in production
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour
  });

  res.json({ message: 'Logged in successfully' });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ username: user.username });
};

const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0) // Expire cookie immediately
  });
  res.json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, getUser, logout };