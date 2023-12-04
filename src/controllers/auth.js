const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
// const User = require('../../models/UsersModel'); // Assuming User model is defined in models folder
const {user} = require('../../models'); // Assuming User model is defined in models folder

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });
};

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(3).max(20).required(), // Set minimum and maximum username length
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Register Failed!',
        details: error.details[0].message,
      });
    }

    const { email, password, username } = req.body;

    // Check if the user already exists
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Register Failed!', details: 'User already exists' });
    }

    // Check if username is already taken
    const existingUsername = await user.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({
        message: 'Register Failed!',
        details: 'Username already taken',
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create a new user
    const newUser = await user.create({
      email,
      password: hashedPassword,
      username,
    });

    // Generate JWT token
    const token = generateAccessToken(newUser);

    res.status(201).json({
      message: 'Register Success!',
      results: {
        token,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Register Failed!', details: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Login Failed!',
        details: 'username or password is incorrect',
      });
    }

    const { email, password } = req.body;

    // Check if the user exists
    const user = await user.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: 'Login Failed!',
        details: 'username length min ... username already taken dll',
      });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Login Failed!',
        details: 'username or password is incorrect',
      });
    }

    // Generate JWT token
    const token = generateAccessToken(user);

    res.status(200).json({
      message: 'Login Success!',
      results: {
        token,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login Failed!', details: error.message });
  }
};

module.exports = {
  register,
  login,
};
