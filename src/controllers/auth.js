<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../../models/UsersModel'); // Assuming User model is defined in models folder

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
=======
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models"); // Assuming User model is defined in models folder

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expiration time
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
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
<<<<<<< HEAD
      return res.status(400).json({
        message: 'Register Failed!',
        details: error.details[0].message,
      });
=======
      return res
        .status(400)
        .json({
          message: "Register Failed!",
          details: error.details[0].message,
        });
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
    }

    const { email, password, username } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
<<<<<<< HEAD
      return res.status(400).json({ message: 'Register Failed!', details: 'User already exists' });
=======
      return res
        .status(400)
        .json({ message: "Register Failed!", details: "User already exists" });
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
    }

    // Check if username is already taken
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
<<<<<<< HEAD
      return res.status(400).json({
        message: 'Register Failed!',
        details: 'Username already taken',
      });
=======
      return res
        .status(400)
        .json({
          message: "Register Failed!",
          details: "Username already taken",
        });
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    // Generate JWT token
    const token = generateAccessToken(newUser);

    res.status(201).json({
<<<<<<< HEAD
      message: 'Register Success!',
=======
      message: "Register Success!",
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
      results: {
        token,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ message: 'Register Failed!', details: error.message });
=======
    res
      .status(500)
      .json({ message: "Register Failed!", details: error.message });
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
<<<<<<< HEAD
      return res.status(400).json({
        message: 'Login Failed!',
        details: 'username or password is incorrect',
      });
=======
      return res
        .status(400)
        .json({
          message: "Login Failed!",
          details: "username or password is incorrect",
        });
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
    }

    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
<<<<<<< HEAD
      return res.status(400).json({
        message: 'Login Failed!',
        details: 'username length min ... username already taken dll',
      });
=======
      return res
        .status(400)
        .json({
          message: "Login Failed!",
          details: "username length min ... username already taken dll",
        });
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
<<<<<<< HEAD
      return res.status(400).json({
        message: 'Login Failed!',
        details: 'username or password is incorrect',
      });
=======
      return res
        .status(400)
        .json({
          message: "Login Failed!",
          details: "username or password is incorrect",
        });
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
    }

    // Generate JWT token
    const token = generateAccessToken(user);

    res.status(200).json({
<<<<<<< HEAD
      message: 'Login Success!',
=======
      message: "Login Success!",
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
      results: {
        token,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ message: 'Login Failed!', details: error.message });
=======
    res.status(500).json({ message: "Login Failed!", details: error.message });
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
  }
};

module.exports = {
  register,
  login,
<<<<<<< HEAD
};
=======
};
>>>>>>> 8094fc3ca419eee63131944591c52c89679d2e8a
